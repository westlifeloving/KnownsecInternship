<template>
  <div>
    <el-dialog
      style="width: 130%; margin-left: -10%"
      :visible.sync="open"
      :title="this.isEdit ? '添加策略' : '修改策略'"
      :append-to-body="true"
      :before-close="close"
    >
      <el-divider></el-divider>
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="100px"
        class="demo-form"
      >
        <el-form-item
          label="策略名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input
            class="addname"
            v-model="form.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="匹配条件"
          :label-width="formLabelWidth"
          prop="condition"
        >
          <el-table
            :data="strategyTableData"
            :header-cell-style="{
              background: 'rgb(64,158,255,0.1)',
              height: '45px',
            }"
            style="
              margin: 15px 0;
              width: 100%;
              border: 1px solid #dcdfe6;
              border-radius: 4px;
            "
          >
            <el-table-column label="类型" width="150" prop="type">
              <template slot-scope="scope">
                <el-select v-model="scope.row.type" placeholder="基础">
                  <el-option
                    v-for="item in type"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select> </template
            ></el-table-column>
            <el-table-column property="field" label="匹配字段" width="200">
              <template slot-scope="scope">
                <el-select v-model="scope.row.field" placeholder="字段">
                  <el-option
                    v-for="item in field"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="symbol" label="逻辑符">
              <template slot-scope="scope">
                <el-select v-model="scope.row.symbol" placeholder="逻辑符">
                  <el-option
                    v-for="item in symbol"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="content" label="匹配内容">
              <template slot-scope>
                <el-input
                  class="content"
                  v-model="form.content"
                  placeholder="只允许填写一个匹配项"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
          <p class="note">
            1、每条策略最多添加3个条件，且所有条件全部匹配上，该策略才生效。
          </p>
          <p class="note">
            2、自定义字段只允许使用字母、数字、横杠，不超过50个字符，且不能与可选字段重复。
            <a href="http://help.yunaq.com/faq/1442/index.html" target="_blank"
              >查看匹配字段说明</a
            >
          </p>
        </el-form-item>
        <el-form-item
          label="匹配动作"
          :label-width="formLabelWidth"
          prop="action"
        >
          <el-select v-model="form.action" placeholder="阻断">
            <el-option label="阻断" value="阻断"></el-option>
            <el-option label="放行" value="放行"></el-option>
            <el-option label="记录" value="记录"></el-option>
            <el-option label="JS挑战" value="JS挑战"></el-option>
            <el-option label="验证码" value="验证码"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="优先级"
          :label-width="formLabelWidth"
          prop="priority"
        >
          <el-input-number
            v-model="form.priority"
            controls-position="right"
            @change="handleChange"
            :min="1"
            :max="100"
            placeholder="1"
          ></el-input-number>
          <span class="note">请填入数字1~100，数字越小代表优先级越高。</span>
        </el-form-item>
        <el-form-item
          label="生效端口"
          :label-width="formLabelWidth"
          prop="port"
        >
          <el-select v-model="form.port" placeholder="">
            <el-option label="443" value="443"></el-option>
            <el-option label="8080" value="8080"></el-option>
          </el-select>
          <span class="note">不填写默认对所有端口生效</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="submit" @click="addStrategy"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
  name: "pushDialog",
  props: {
    open: Boolean,
    choose: { type: Boolean, default: false },
    // addStrategy: Boolean,
  },
  data: function () {
    return {
      editLoading: false,
      isEdit: true,
      strategyTableData: [{ type: "", field: "", symbol: "" }],
      formLabelWidth: "120px",
      form: {
        id: "",
        name: "",
        condition: "",
        type: "",
        field: "",
        syboml: "",
        content: "",
        action: "",
        port: "",
        priority: "",
      },
      type: [
        {
          label: "基础",
          value: 1,
        },
        {
          label: "自定义",
          value: 2,
        },
      ],
      field: [
        {
          label: "Cokkie",
          value: 1,
        },
        {
          label: "Referer",
          value: 2,
        },
        {
          label: "HTTP-Method",
          value: 3,
        },
        {
          label: "User-Agent",
          value: 4,
        },
        {
          label: "X-Forwarded-For",
          value: 5,
        },
        {
          label: "URI",
          value: 6,
        },
      ],
      symbol: [
        {
          label: "包含",
          value: 1,
        },
        {
          label: "不包含",
          value: 2,
        },
        {
          label: "等于",
          value: 3,
        },
        {
          label: "不等于",
          value: 4,
        },
        {
          label: "长度小于",
          value: 5,
        },
        {
          label: "长度等于",
          value: 6,
        },
      ],
      rules: {
        name: [{ required: true, message: "请输入策略名称", trigger: "blur" }],
        action: [
          { required: true, message: "请选择匹配动作", trigger: "change" },
        ],
        priority: [
          { required: true, message: "请输入优先级", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    choose: {
      handler(newValue, oldValue) {
        this.isEdit = newValue;
        console.log(this.isEdit);
      },
    },
  },
  methods: {
    addStrategy(e, isEdit) {
      if (isEdit == true) {
        e.preventDefault();
        const newStrategy = {
          id: uuidv4(),
          name: this.form.name,
          action: this.form.action,
          priority: this.form.priority,
          port: this.form.port,
        };
        console.log(this.form.action);
        //Send up to parent
        this.$emit("add-strategy", newStrategy);
        this.form.name = "";
        let show = false;
        this.$emit("update:open", show);
      } else if (isEdit == false) {
        this.tableData.splice(this.table_index, 1, this.form);
        let show = false;
        this.$emit("update:open", show);
      }
    },
    handleChange(value) {
      console.log(value);
    },
    close() {
      let show = false;
      this.$emit("update:open", show);
    },
  },
};
</script>

<style scoped>
.el-header {
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.note {
  color: rgb(255, 196, 0);
  font-size: 10px;
  margin: 0 0 0 10px;
}

.el-dialog {
  margin-left: 40vh;
}

.el-divider--horizontal {
  margin: -30px 0 15px 0 !important;
}

.el-dialog__body {
  padding: 0px 20px !important;
}

.el-form-item__label {
  width: 80px !important;
}

.el-form-item__content {
  margin-left: 100px !important;
}

.addname {
  width: 40% !important;
}

.el-page-header__left .el-icon-back {
  font-size: 0px !important;
  margin-right: 0px !important;
}

[class*=" el-icon-"],
[class^="el-icon-"] {
  font-family: Arial, Helvetica, sans-serif !important;
}

.el-page-header__left {
  margin-left: -20px !important;
}

.el-page-header__left::after {
  background-color: #0080ff !important;
  width: 2px !important;
}
</style>
