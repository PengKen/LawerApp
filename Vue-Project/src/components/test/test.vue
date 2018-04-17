<!--<template>  
  <div id="test">  
  	<mt-button type="default">aaaa</mt-button>
  	<mt-button size="large">large</mt-button>
  	<mt-button type="danger">danger</mt-button>
	<mt-progress :value="20" :bar-height="5"></mt-progress>
	

  </div>  
</template>  
   
<script>  
  import Vue from 'vue'
 import { Picker,Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
//import 'mint-ui/lib/button/style.css';


import { Toast,Button } from 'mint-ui';
Vue.component(Button.name, Button);
import { Popup } from 'mint-ui';

Vue.component(Popup.name, Popup);

import { Progress } from 'mint-ui';

Vue.component(Progress.name, Progress);
Vue.component(Button.name, Button);

console.log(Button)



Toast('Upload Complete');
export default {
  methods: {
   	onValuesChange(picker, values) {  
           
         	
        picker.setSlotValues(1,this.majorArr[values[0]])
    }
  },
  data() {
    return {
    	popupVisible:true,
    	showToolbar:true,
    	majorArr: {
    				'数信学院':['计科', '软工', '网工', '信科', '信息','工业工程'],
    				'人文与法学院':['哲学', '法学', '中文学', '汉语', '法学','历史学'],
    				'食品学院':['食品科学与工程','食品质量与安全','生物工程','包装工程'],
    				'经管学院':['经济学', '管理学', '金融', '人力资源','市场营销','国际经济与贸易'],
    				'兽医学院':['动物科学','水产养殖','蚕学'],
    				'工程学院':['测绘', '自动化', '车辆', '土木', '材料','建筑'],	
    				'动科学院':['动物科学','水产养殖','蚕学'],
    				'艺术学院':['服装设计与工程','服装与服饰设计','视觉传达设计','环境设计','产品设计','动画','音乐学','广播电视编导','表演']
    			},
      slots: [
        {
          flex: 1,
          values: ['数信学院', '人文与法学院', '工程学院', '经管学院', '食品学院', '兽医学院','动科学院','艺术学院'],
          className: 'slot1',
          textAlign: 'right'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values:['计科', '软工', '网工', '信科', '信息','工业工程'],
          className: 'slot3',
          textAlign: 'left'
        }
      ]
    };
  }
};
</script>  
   
<style>  
   
</style> -->