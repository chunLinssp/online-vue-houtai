<template>
  <div class="wrap-menu">
    <el-table
      :data="menuData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="menuId"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="menuId"
        label="菜单编号"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="menuName"
        label="菜单编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="url"
        label="请求地址">
      </el-table-column>
      <el-table-column
        prop="menuType"
        label="菜单类型"
        >  
      <template slot-scope="scope">
        <el-tag type="primary" v-if="scope.row.menuType=== 'M'">
          目录
        </el-tag>
        <el-tag type="success" v-if="scope.row.menuType=== 'C'">
          菜单
        </el-tag>
        <el-tag type="warning" v-if="scope.row.menuType=== 'F'">
          操作
        </el-tag>
      </template>
      </el-table-column>
      <el-table-column
        prop="perms"
        label="菜单标识">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button @click="handleLook(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteMenu(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- Modal -->
    <div class="modal fade" id="myModal" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Modal title</h4>
          </div>
          <div class="modal-body">
            <template v-if="sigleData!=null">
              <el-form ref="form" :model="sigleData" label-width="80px">
                <el-form-item label="编号">
                  <el-input
                    id="mId"
                    placeholder="请输入内容"
                    v-model="sigleData.menuId"
                    :disabled="true"
                     >
                  </el-input>
                </el-form-item>
                <el-form-item label="菜单名称">
                  <el-input
                    placeholder="请输入内容"
                    v-model="sigleData.menuName"
                    >
                  </el-input>
                </el-form-item>
                <!-- <template v-if="sigleData.menuType != 'M' && sigleData.menuType != 'F'"> -->
                  <el-form-item label="请求地址">
                  <el-input
                    placeholder="请输入内容"
                    v-model="sigleData.url"
                    >
                    </el-input>
                  </el-form-item>
                <!-- </template>
                <template v-if="sigleData.menuType != 'M'"> -->
                  <el-form-item label="菜单类型">
                    <el-select  v-model="sigleData.menuType"  placeholder="菜单类型"  >
                      <el-option label="操作" value="F"></el-option>
                      <el-option label="菜单" value="C"></el-option>
                      <el-option label="目录" value="M"></el-option>
                    </el-select>
                  </el-form-item>
                <!-- </template> -->
                <!-- <template v-if="sigleData.menuType == 'F'"> -->
                    <el-form-item label="菜单标识">
                    <el-input
                      placeholder="请输入内容"
                      v-model="sigleData.perms"
                      >
                    </el-input>
                     </el-form-item>
                <!-- </template> -->
             </el-form>
            </template>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="saveMenu">Save changes</button>
          </div>
        </div>
      </div>
    </div>
   
  </div>
</template>
<script>
import {menuList,menuDelete,menuInsert,getMenuById,menuEdit} from '@/api/SysMenu'
export default{
   data() {
      return {
        menuData:[],
        sigleData:{},
      }
    },
    created() {
     this.getMenuList();
     this.initModel();
    },
    methods: {
      initModel() {
      },
      getMenuList() {
        let that = this;
         menuList().then(res=>{
          that.menuData = res.data;
      })
      },
      handleLook(row) {
        let that = this;
        getMenuById(row).then(res =>{
          console.log(res);
          that.sigleData = res.data[0];
          $('#myModal').modal('show');
        })
        
      },
      saveMenu() {
        let that = this;
        console.log(this.sigleData);
        menuEdit(this.sigleData).then(res =>{
           this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              });
          $('#myModal').modal('hide');
          that.getMenuList();
        })
      },
      deleteMenu(row) {
        console.log(row.children);
        if(row.children.length !== 0) {
           this.$message.error('存在子元素，请重新操作');
        }else {
          console.log(row);
          let that = this;
           menuDelete(row).then(res=>{
            console.log(res);
            if(res.code === 200) {
               this.$message({
                showClose: true,
                message: '成功删除',
                type: 'success'
              });
              that.getMenuList();
            }
          })
        }
        
      }
    },
}
</script>
<style  >
.wrap-menu{
  overflow:auto;
}

</style>