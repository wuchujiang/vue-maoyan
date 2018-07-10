import Vue from 'vue';

class Loading {
  constructor() {
    
  }

  show(msg) {
    const Profile = Vue.extend({
      template: `<div id="global-loading" class="ui-loading ui-loading-open">
      <div class="ui-loading-container">
        <div class="ui-loading-items">
          <div class="ui-loading-item" v-for="k in 12"></div>
        </div>
        <div class="ui-loading-inner">{{msg}}</div>
      </div>
      <div class="ui-loading-mask"></div>
    </div>`,
      data() {
        return {
          msg: msg || '加载中',
          items: [1,2,3,4,5,6,7,8,9,10,11,12],
        }
      }
    });
    const div = document.createElement('div');
    div.id = 'loading';
    document.body.appendChild(div);
    this.loading = new Profile().$mount('#loading');
  };
  hide() {
    this.loading.$destroy();
    document.body.removeChild(document.getElementById('global-loading'));
    this.loading = null;
  }
}

export default new Loading();