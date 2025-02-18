<template>
  <view>
    <view class="cu-card">
      <view class="cu-item shadow">
        <view class="content">
          <view class="text-lg">{{project.projectName}}</view>
          <view class="text-gray">投资主体：{{project.investmentBody}}</view>
          <view class="text-gray">建设性质：{{project.constructionNature}}</view>
          <view class="text-gray">总投资：{{project.totalInvestment}}</view>
          <view class="text-gray">计划完成投资：{{project.plannedInvestment2025}}</view>
          <view class="text-gray">计划开复工时间：{{project.plannedStartTime}}</view>
          <view class="text-gray">计划完工时间：{{project.plannedEndTime}}</view>
          <view class="text-gray">分管领导：{{project.supervisor}}</view>
          <view class="text-gray">责任单位：{{project.responsibleUnit}}</view>
        </view>
      </view>
    </view>
    
    <view class="cu-bar bg-white solid-bottom margin-top">
      <view class="action">
        <text class="cuIcon-title text-blue"></text>项目进度
      </view>
    </view>
    
    <view class="padding bg-white">
      <view class="cu-progress round">
        <view class="bg-blue" :style="[{width: progress.visualProgress + '%'}]">
          {{progress.visualProgress}}%
        </view>
      </view>
      <view class="margin-top">{{progress.progressDescription}}</view>
    </view>
    
    <view class="cu-bar bg-white solid-bottom margin-top">
      <view class="action">
        <text class="cuIcon-title text-green"></text>活跃状态
      </view>
    </view>
    
    <view class="padding bg-white">
      <view class="text-lg">{{activity.isActive ? '活跃' : '不活跃'}}</view>
      <view class="text-gray">最后更新：{{activity.lastUpdateTime}}</view>
      <view class="text-gray">更新内容：{{activity.lastUpdateContent}}</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      project: {},
      progress: {
        visualProgress: 0,
        progressDescription: ''
      },
      activity: {
        isActive: false,
        lastUpdateTime: '',
        lastUpdateContent: ''
      }
    }
  },
  onLoad(options) {
    if (options.id) {
      this.loadProjectDetail(options.id)
      this.loadProjectProgress(options.id)
      this.loadProjectActivity(options.id)
    }
  },
  methods: {
    loadProjectDetail(id) {
      this.$api.projectDetail(id).then(res => {
        if (res.data.success) {
          this.project = res.data.result
        } else {
          this.$tip.error(res.data.message)
        }
      }).catch(err => {
        this.$tip.error('加载失败')
      })
    },
    loadProjectProgress(id) {
      this.$api.projectProgress(id).then(res => {
        if (res.data.success) {
          this.progress = res.data.result
        } else {
          this.$tip.error(res.data.message)
        }
      }).catch(err => {
        this.$tip.error('加载失败')
      })
    },
    loadProjectActivity(id) {
      this.$api.projectActivity(id).then(res => {
        if (res.data.success) {
          this.activity = res.data.result
        } else {
          this.$tip.error(res.data.message)
        }
      }).catch(err => {
        this.$tip.error('加载失败')
      })
    }
  }
}
</script>

<style>
.cu-card {
  margin: 30rpx;
}
.cu-card .cu-item {
  margin: 0;
}
.cu-card .content {
  padding: 30rpx;
}
.cu-card .content .text-lg {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}
.cu-card .content .text-gray {
  font-size: 28rpx;
  margin-bottom: 10rpx;
}
.cu-progress {
  height: 40rpx;
  border-radius: 20rpx;
}
.cu-progress view {
  font-size: 24rpx;
  line-height: 40rpx;
}
</style>
