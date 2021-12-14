<template>
  <div class="qa-service-container">
    <HomeHeader title="问答服务" subtitle="输入问题将由机器人自动回复" />
    <!-- <Question /> -->
    <QuestionContent />
  </div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader.vue';
import Question from '@/components/Question.vue';
import QuestionContent from '../components/QuestionContent.vue';

export default {
  name: 'QAService',
  components: {
    HomeHeader,
    Question,
    QuestionContent,
  },
};
</script>

<style scoped>
.qa-service-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 69px);
}
</style>
