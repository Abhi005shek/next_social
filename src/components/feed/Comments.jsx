import CommentList from "./CommentList";

async function Comments({ postId }) {
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div>
      {/* write */}
      <CommentList comments={comments} postId={postId} />
    </div>
  );
}

export default Comments;
