<template>
  <div>
      <div>
        <el-button @click="toggleStatusOk()">审核通过</el-button>
        <el-button @click="toggleStatusCancle()">审核失败</el-button>
        <el-button @click="toggleCheckCancle()">取消选择</el-button>
      </div>
      <el-table
      ref="multipleTable"
      :data="articleData"
      tooltip-effect="dark"
      style="width: 100%"

      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="文章编号"
         >
      </el-table-column>
      <el-table-column
        prop="summary"
        label="文章概要"
         >
        <template slot-scope="scope">
            <el-tag
              type="info"
              effect="plain">
              {{ scope.row.summary.substring(0,10) }}....
            </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="审核状态"
        show-overflow-tooltip
        :formatter="formatter"
        >
       
      </el-table-column>
      <el-table-column
        prop="articleCategory.categoryname"
        label="文章分类"
        show-overflow-tooltip
        >
        <template slot-scope="scope">
          <el-tag type="success">{{scope.row.articleCategory.categoryname}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章标题"
         >
        <template slot-scope="scope">
            <el-tag
              type="info"
              effect="plain">
              {{ scope.row.title.substring(0,10) }}....
            </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleLook(scope.row)">查看</el-button>
      </template>
      </el-table-column>
    </el-table>
     <el-pagination
        style="float:right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNum"
        :page-sizes="[5,10,15,20]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.pageTotal">
    </el-pagination>
     <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">文章细节</h4>
          </div>
          <div class="modal-body">
            <h1>{{singleData.title}}</h1>
            <span >概要:</span>
            <h5  style="display:inline-block">{{singleData.summary}}</h5> 
            <el-divider></el-divider>
            <article v-html="singleData.articleBody.contentHtml" class="myArticleDetail">
              {{singleData.articleBody.contentHtml}}
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ArticleList,ArticleById,updateArticle} from '@/api/SysArticle'
 export default {
    data() {
      return {
        page:{
          pageNum:1,
          pageSize:5,
          pageTotal:0
        },
        articleData:[],
        status:false,
        singleData:{
          title:'',
          summary:'',
          articleBody:{
            contentHtml:''
          }
        },
        multipleSelection:[],
        
      }
    },  
    created() {
      this.page.pageNum = 1;
      this.getArticle();
    },
    methods: {
      getArticle() {
        let that = this;
        
        ArticleList(this.page).then(res =>{
          that.articleData = res.data;
          console.log(res);
          that.page.pageTotal = res.total;
        })
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      formatter(row, column, cellValue) {
        if(row.status === '0') {
          return "待审核";
        }else {
          return "审核";
        }
        return '<p>ss</p>';
      },
      handleLook(row) {
        let that = this;
        ArticleById(row).then(res =>{
          that.singleData = res.data[0];
          console.log(res);
        })
        $('#myModal').modal('show');
      },
      toggleCheckCancle() {
          this.$refs.multipleTable.clearSelection();
      },
      toggleStatusOk() {
        for(var i = 0;i<this.multipleSelection.length;i++) {
          this.multipleSelection[i].status = "1";
        }
        updateArticle(this.multipleSelection).then(res =>{
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          });
        })

      },
      toggleStatusCancle() {
          for(var i = 0;i<this.multipleSelection.length;i++) {
          this.multipleSelection[i].status = "0";
        }
        updateArticle(this.multipleSelection).then(res =>{
          this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              });
        })
      },
       handleSizeChange(val) {
        this.page.pageSize = val;
      },
      handleCurrentChange(val) {
        this.page.pageNum = val;
        this.getArticle();
      }

    },
    watch:{
      status:function(newValue) {
        if(newValue == true) {
        }
      }
    }
  }

</script>
<style scoped>
.myArticleDetail img{
  width:100%;
}
.myArticleDetail p{
  font-size: 88px;
}
.myArticleDetail{
  background-color: aqua;
}

</style>