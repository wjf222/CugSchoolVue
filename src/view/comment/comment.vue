<template>
  <div>
    <comments-item key="wjf" avatar="http://39.99.203.80:8080/images/1.jpg" author="王纪锋" 
    content="你好呀" time="2017-05-20" hasReply="false"
    @addReply="handleAddReply(comment)">
        <ReplyItem key ="wwx" author="王文旭" content="我很好" time="2017-05-21">
        </ReplyItem>
    </comments-item>
  </div>
</template>

<script>
import CommentsItem from "./comment-item";
import ReplyItem from "./reply-item";
export default {
  name: "comment_page",
  components: {
    CommentsItem,
    ReplyItem
  },
  methods: {}
};
</script>

<style>
</style>
