import { Get, Post } from './utils';

export const profileService = {
    getBoardsandPosts: ({ username }) => {
        return Get(`/users/${username}`);
    },
    follow: ({ followee }) => {
        return Post('/users/follow', { followee });
    },
    unfollow: ({ followee }) => {
        return Post('/users/unfollow', { followee });
    }
};
