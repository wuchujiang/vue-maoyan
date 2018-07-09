<template>
	<section>
		<section class="city">
			<section class="location-city">
				<h6 class="fixed-title" data-id="local">定位城市</h6>
        <div class="city-box">
          <section class="city-wrap">
            <div @click="getLocation" class="city-btn">{{positionStatus.msg}}</div>
          </section>
        </div>
			</section>
			<section v-if="visitList.length > 0" class="visit-city">
				<h6 class="fixed-title" data-id="history">最近访问城市</h6>
        <div class="city-box">
          <div class="city-wrap">
            <div @click="selectCity(item)" class="city-btn" :key="item" v-for="item in visitList">
              {{item}}
            </div>
				</div>
        </div>
			</section>
			<section class="hot-city">
				<h6 class="fixed-title" data-id="hot">热门城市</h6>
				<div class="city-box">
          <div class="city-wrap">
					<div @click="selectCity(item.nm)" class="city-btn" :key="item.id" v-for="item in hotList">
						{{item.nm}}
					</div>
				</div>
        </div>
			</section>
			<section class="list-city">
				<div class="list-box" v-for="item, index in cityList" :key="index">
					<h6 class="fixed-title" :data-id="item.key">{{item.key}}</h6>
					<ul>
						<li @click="selectCity(k.nm)" v-for="k in item.value" :key="k.id" :data-id="k.id" :data-py="k.py">{{k.nm}}</li>
					</ul>
				</div>
			</section>
		</section>
		<section class="nav">
			<section @touchmove.prevent="touchmove" class="nav-wrap">
				<section @click.prevent="scrollPage('local')" class="nav-item" data-id="local">定位</section>
				<section @click.prevent="scrollPage('history')" v-if="visitList.length" class="nav-item" data-id="history">最近</section>
				<section @click.prevent="scrollPage('hot')" class="nav-item" data-id="hot">热门</section>
				<section @click.prevent="scrollPage(item)" v-for="item in navbar" :key="item" :data-id="item" class="nav-item nav-letter">{{item}}</section>
			</section>
		</section>
	</section>
</template>

<style lang="scss">
.city {
  padding-right: 40px;
  h6 {
    height: 60px;
    padding-left: 30px;
    font-size: 26px;
    font-weight: normal;
    line-height: 60px;
  }
  .city-box {
    background: #f5f5f5;
    padding: 0 30px 30px 30px;
  }
  .city-wrap {
    display: flex;
    flex-wrap: wrap;
    .city-btn {
      width: 30%;
      background: #fff;
      text-align: center;
      border: 1px solid #e6e6e6;
      height: 60px;
      line-height: 60px;
      margin-top: 30px;
      margin-right: 4%;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
  .list-box {
    h6 {
      padding-left: 50px;
    }
    ul {
      padding: 0 60px 0 30px;
      background: #f5f5f5;
      li {
        height: 80px;
        line-height: 80px;
        border-bottom: 1px solid #c8c7cc;
      }
    }
  }
}
.nav {
  position: fixed;
  width: 100px;
  height: 100%;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  font-size: 24px;
  line-height: 32px;
  z-index: 100;
  text-align: center;
  .nav-wrap {
    width: 100px;
  }
  .nav-letter {
    padding-left: 30px;
  }
}
</style>


<script>
import jsonp from "jsonp";
export default {
  name: "city",
  data() {
    return {
      cityList: [],
      hotList: [],
      visitList: [],
      navbar: [],
      navWrapOffsetTop: "",
      navWrap: null,
      navItem: null,
      positionStatus: {
        code: "",
        msg: ""
      }
    };
  },
  created() {
    this.fetchCity();
    this.getLocation();
  },
  mounted() {},
  methods: {
    async fetchCity() {
      const city = localStorage.getItem("city");
      const visitList = localStorage.getItem("visitList");
      let cts = null;
      if (visitList) {
        this.visitList = JSON.parse(visitList);
      }
      if (city) {
        cts = JSON.parse(city);
      } else {
        const city = await this.$axios.get("/dianying/cities.json");
        cts = city.cts;
        localStorage.setItem("city", JSON.stringify(cts));
      }
      this.hotList = cts.slice(0, 10);
      const sortList = this.sortList(cts);
      this.cityList = sortList.newKeys;
      this.navbar = sortList.at;
    },
    sortList(citys) {
      // 循环数据，根据拼音首字母匹配数字
      const hash = {};
      for (let i = 0, city; (city = citys[i++]); ) {
        const at = city.py[0].toLocaleUpperCase();
        if (hash[at]) {
          hash[at].push(city);
        } else {
          hash[at] = [city];
        }
      }
      const keys = Object.keys(hash).sort();
      const newKeys = keys.map(item => ({
        key: item,
        value: hash[item]
      }));
      return {
        at: keys,
        newKeys
      };
    },
    scrollPage(id) {
      if (!this.fixedTitle) {
        this.fixedTitle = [...document.querySelectorAll(".fixed-title")];
      }
      const fixedItem = this.fixedTitle.filter(
        item => item.dataset.id === id
      )[0];
      if (fixedItem) {
        const offsetTop = fixedItem.offsetTop;
        window.scrollTo(0, offsetTop);
      }
    },
    touchmove(e) {
      const touch = e.touches[0];
      if (!this.navWrap) {
        this.navWrap = document.querySelector(".nav-wrap");
        this.navWrapOffsetTop = this.navWrap.offsetTop;
        this.navItem = [...document.querySelectorAll(".nav-item")];
        this.bx = this.navItem[0].clientHeight;
      }

      if (!this.fixedTitle) {
        this.fixedTitle = [...document.querySelectorAll(".fixed-title")];
      }

      const dx = touch.clientY - this.navWrapOffsetTop;
      if (dx >= 0) {
        const idx = Math.round(dx / this.bx);
        const currentItem = this.fixedTitle[idx];
        const currentTop = currentItem.offsetTop;
        window.scrollTo(0, currentTop);
      }
    },
    getLocation() {
      if (this.positionStatus.code === "loading") {
        return false;
      }

      if (this.positionStatus.code === "success") {
        // 选取城市
        this.selectCity(this.positionStatus.msg);
        return false;
      }

      this.positionStatus = {
        code: "loading",
        msg: "正在定位"
      };
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          // 根据坐标获取地址;
          jsonp(
            `https://apimobile.meituan.com/group/v1/city/latlng/${latitude},${longitude}?tag=1&_=1531143806763`,
            null,
            (err, res) => {
              if (err) {
                this.positionStatus = {
                  code: "error",
                  msg: "定位失败"
                };
              } else {
                const data = res.data;
                localStorage.setItem("localCity", JSON.stringify(res.data));
                this.positionStatus = {
                  code: "success",
                  msg: data.city
                };
              }
            }
          );
        },
        err => {
          this.positionStatus = {
            code: "error",
            msg: "定位失败"
          };
        }
      );
    },

    selectCity(city) {
      let visitList = localStorage.getItem("visitList");
      visitList = visitList ? JSON.parse(visitList) : [];
      if (!visitList.includes(city)) {
        visitList.push(city);
      }
      localStorage.setItem("visitList", JSON.stringify(visitList.slice(-10)));
      localStorage.setItem("locationCity", decodeURIComponent(city));
      this.$router.push("/");
    }
  }
};
</script>
