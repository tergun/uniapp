<template>
  <view>
    <mescroll-uni @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback">
      <view class="cu-list menu">
        <view class="cu-item" v-for="item in projectList" :key="item.id" @tap="goDetail(item.id)">
          <view class="content">
            <text class="text-lg">{{item.projectName}}</text>
            <text class="text-gray text-sm">{{item.investmentBody}}</text>
          </view>
          <view class="action">
            <text class="cuIcon-right"></text>
          </view>
        </view>
      </view>
    </mescroll-uni>
  </view>
</template>

<script>
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue'

export default {
  components: {
    MescrollUni
  },
  data() {
    return {
      projectList: [],
      downOption: {
        auto: true
      },
      upOption: {
        page: {
          num: 0,
          size: 10
        },
        noMoreSize: 5
      }
    }
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll
    },
    downCallback() {
      this.projectList = []
      this.mescroll.resetUpScroll()
    },
    upCallback(page) {
      let pageNo = page.num
      let pageSize = page.size
      
      this.$api.projectList({
        pageNo: pageNo,
        pageSize: pageSize
      }).then(res => {
        if (res.data.success) {
          const records = res.data.result.records || []
          this.mescroll.endSuccess(records.length)
          
          if (page.num === 1) this.projectList = []
          this.projectList = this.projectList.concat(records)
        } else {
          this.mescroll.endErr()
          this.$tip.error(res.data.message)
        }
      }).catch(err => {
        this.mescroll.endErr()
        this.$tip.error('加载失败')
      })
    },
    goDetail(id) {
      this.$Router.push({
        name: 'projectDetail',
        params: { id: id }
      })
    }
  }
}
</script>

<style>
.cu-list.menu>.cu-item {
  min-height: 120rpx;
}
.cu-list.menu>.cu-item .content {
  display: flex;
  flex-direction: column;
}
.cu-list.menu>.cu-item .content .text-lg {
  font-size: 32rpx;
  margin-bottom: 8rpx;
}
.cu-list.menu>.cu-item .content .text-sm {
  font-size: 26rpx;
}
</style>
