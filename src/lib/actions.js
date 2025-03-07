"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "../lib/client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// SwitchFollow Steps: -
// 1. First check if the current user is already following the user
// 2. If follower exists, delete that record
// 3. Else, check if follow request has already been sent
// 4. If sent, then delete that record of the follow request
// 5. Else, send a new follow request

export const switchFollow = async (userId) => {
  try {
    const { userId: currentUserId } = await auth();

    if (!currentUserId) {
      throw new Error("User is not authenticated");
    }

    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });

    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      const existingFollowReq = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });

      if (existingFollowReq) {
        await prisma.followRequest.delete({
          where: {
            id: existingFollowReq.id,
          },
        });
      } else {
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (error) {
    console.error("Error: ", error);
    throw new Error("Something went wrong");
  }
};

export const switchBlock = async (userId) => {
  try {
    const { userId: currentUserId } = await auth();

    if (!currentUserId) {
      throw new Error("User is not authenticated");
    }

    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });

    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (error) {
    console.error("Error: ", error);
    throw new Error("Something went wrong");
  }
};

export const acceptFollowRequest = async (userId) => {
  try {
    const { userId: currentUserId } = await auth();

    if (!currentUserId) {
      throw new Error("User is not authenticated");
    }

    const existingFollowReq = await prisma.followRequest.findFirst({
      where: {
        receiverId: currentUserId,
        senderId: userId,
      },
    });

    console.log("Existing Follow Request", existingFollowReq);

    if (existingFollowReq) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowReq.id,
        },
      });

      await prisma.follower.create({
        data: {
          followingId: currentUserId,
          followerId: userId,
        },
      });
    }
  } catch (error) {
    console.error("Error: ", error);
    throw new Error("Something went wrong");
  }
};

export const declineFollowRequest = async (userId) => {
  try {
    const { userId: currentUserId } = await auth();

    if (!currentUserId) {
      throw new Error("User is not authenticated");
    }

    const existingFollowReq = await prisma.followRequest.findFirst({
      where: {
        receiverId: currentUserId,
        senderId: userId,
      },
    });

    if (existingFollowReq) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowReq.id,
        },
      });
    }
  } catch (error) {
    console.error("Error: ", error);
    throw new Error("Something went wrong");
  }
};

export const updateprofile = async (prevState, { formData, cover }) => {
  try {
    const fields = Object.fromEntries(formData);
    const filteredFields = Object.fromEntries(
      Object.entries(fields).filter(([_, value]) => value != "")
    );
    const Profile = z.object({
      cover: z.string().optional(),
      name: z.string().max(60).optional(),
      surname: z.string().max(60).optional(),
      city: z.string().max(60).optional(),
      description: z.string().max(255).optional(),
      work: z.string().max(60).optional(),
      website: z.string().max(60).optional(),
      school: z.string().max(60).optional(),
    });

    const { userId } = await auth();
    const validateFields = Profile.safeParse({ cover, ...filteredFields });

    if (!validateFields.success) {
      console.log(validateFields.error.flatten().fieldErrors);
      return { success: false, error: true };
    }

    if (!userId) return { success: false, error: true };

    await prisma.user.update({
      where: {
        clerkId: userId,
      },
      data: validateFields.data,
    });

    revalidatePath(`/profile/`);
    return { success: true, error: false };
  } catch (error) {
    console.error("Error: ", error);
    return { success: false, error: true };
  }
};

export const switchLike = async (postId) => {
  try {
    const { userId: currentUserId } = await auth();

    if (!currentUserId) {
      throw new Error("User is not authenticated");
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        postId: postId,
        userId: currentUserId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          postId: postId,
          userId: currentUserId,
        },
      });
    }
  } catch (error) {
    console.error("Error: ", error);
    throw new Error("Something went wrong");
  }
};

export const addComment = async (postId, desc) => {
  try {
    const { userId: currentUserId } = await auth();

    if (!currentUserId) {
      throw new Error("User is not authenticated");
    }

    const createComment = await prisma.comment.create({
      data: {
        postId: postId,
        userId: currentUserId,
        desc: desc,
      },
      include: {
        user: true,
      },
    });

    return createComment;
  } catch (error) {
    console.error("Error: ", error);
    throw new Error("Something went wrong");
  }
};

export const addPost = async (formData, img) => {
  const desc = formData.get("desc");
  const Desc = z.string().min(1).max(255);

  const validateDesc = Desc.safeParse(desc);
  if (!validateDesc.success) {
    return "";
  }

  try {
    const { userId: currentUserId } = await auth();

    if (!currentUserId) {
      throw new Error("User is not authenticated");
    }

    const createdPost = await prisma.post.create({
      data: {
        img,
        userId: currentUserId,
        desc: validateDesc.data,
      },
      include: {
        user: true,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Error: ", error);
    throw new Error("Something went wrong");
  }
};

export const deletePost = async (postId) => {
  try {
    const { userId: currentUserId } = await auth();

    if (!currentUserId) {
      throw new Error("User is not authenticated");
    }

    await prisma.post.delete({
      where: {
        userId: currentUserId,
        id: postId,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Error: ", error);
    throw new Error("Something went wrong");
  }
};

export const addStory = async (img) => {
  try {
    const { userId: currentUserId } = await auth();

    if (!currentUserId) {
      throw new Error("User is not authenticated");
    }

    const existingStory = await prisma.story.findFirst({
      where: {
        userId: currentUserId,
      },
    });

    if (existingStory) {
      await prisma.story.delete({
        where: {
          id: existingStory.id,
        },
      });
    }

    const createdStory = await prisma.story.create({
      data: {
        userId: currentUserId,
        img,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });
    return createdStory;
  } catch (error) {
    console.error("Error: ", error);
    throw new Error("Something went wrong");
  }
};
