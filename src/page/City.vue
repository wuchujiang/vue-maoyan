<template>
	<section>
		<section class="city">
			<section class="location-city">
				<h6 class="fixed-title" data-id="local">定位城市</h6>
				<section class="city-wrap">
					<div class="city-btn">定位..城市</div>
				</section>
			</section>
			<section v-if="visitList.length > 0" class="visit-city">
				<h6 class="fixed-title" data-id="history">最近访问城市</h6>
			</section>
			<section class="hot-city">
				<h6 class="fixed-title" data-id="hot">热门城市</h6>
				<div class="city-wrap">
					<div class="city-btn" :key="item.id" v-for="item in hotList">
						{{item.nm}}
					</div>
				</div>
			</section>
			<section class="list-city">
				<div class="list-box" v-for="item, index in cityList" :key="index">
					<h6 class="fixed-title" :data-id="item.key">{{item.key}}</h6>
					<ul>
						<li v-for="k in item.value" :key="k.id" :data-id="k.id" :data-py="k.py">{{k.nm}}</li>
					</ul>
				</div>
			</section>
		</section>
		<section class="nav">
			<section class="nav-wrap">
				<section class="nav-item" data-id="local">定位</section>
				<section v-if="visitList.length" class="nav-item" data-id="history">最近</section>
				<section class="nav-item" data-id="hot">热门</section>
				<section v-for="item in navbar" :key="item" :data-id="item" class="nav-item nav-letter">{{item}}</section>
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
  .city-wrap {
    background: #f5f5f5;
    padding: 0 30px 30px 30px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .city-btn {
      width: 30%;
      background: #fff;
      text-align: center;
      border: 1px solid #e6e6e6;
      height: 60px;
      line-height: 60px;
      margin-top: 30px;
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
  width: 60px;
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  font-size: 24px;
  line-height: 32px;
  z-index: 100;
  text-align: center;
  .nav-letter {
    padding-left: 30px;
  }
}
</style>


<script>
export default {
  name: "city",
  data() {
    return {
      cityList: [],
      hotList: [],
      visitList: [],
      locationCity: {},
      navbar: []
    };
  },
  created() {
    this.fetchCity();
  },
  mounted() {},
  methods: {
    async fetchCity() {
      const city = localStorage.getItem("city");
      const visitList = localStorage.getItem("visitList");
      const cts = null;
      if (visitList) {
        this.visitList = JSON.parse(visitList);
      }
      if (city) {
        cts = JSON.parse(city);
      } else {
        const city = await this.$axios.get("/dianying/cities.json");
        cts = city.cts;
      }
      this.hotList = cts.slice(0, 10);
      const sortList = this.sortList(cts);
      this.cityList = sortList.newKeys;
      this.navbar = sortList.at;
      this.$nextTick(() => {
        this.scroll();
      });
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
    scroll() {
      const navItem = document.querySelectorAll(".nav-item");
      const navWrap = document.querySelector(".nav-wrap");
      navWrap.onscroll = function(e) {
        e.preventDefault();
        return false;
      };
      navItem.forEach(item => {
        item.addEventListener(
          "click",
          () => {
            const dataId = item.dataset.id;
            const fixedTitle = [...document.querySelectorAll(".fixed-title")];
            const fixedItem = fixedTitle.filter(
              item => item.dataset.id === dataId
            )[0];
            if (fixedItem) {
              const offsetTop = fixedItem.offsetTop;
              window.scrollTo(0, offsetTop);
            }
            console.log(fixedItem);
          },
          false
        );
      });
    }
  }
};
</script>
