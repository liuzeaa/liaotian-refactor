<template>
    <div>
        <el-form>
            <el-form-item  label="内容" label-width="50px">
                <el-input v-model="content"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                content:''
            }
        },
        props: ['content','title'],
        methods: {
            cancel(){
                this.$emit('cancel')
            },
            save(){
                this.$emit('save')
            }
        }
    }
</script>