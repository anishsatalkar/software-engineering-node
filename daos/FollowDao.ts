import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/follows/Follow";
import FollowModel from "../mongoose/follows/FollowModel";

export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    userFollows = async (followerId: string, followedId: string): Promise<Follow> =>
        FollowModel.findOneAndUpdate({userFollowing: followerId, userFollowed: followedId},
            {userFollowing: followerId, userFollowed: followedId},{upsert: true, new: true});

    userUnfollows = async (uid: string, followedId: string): Promise<any> =>
        FollowModel.deleteOne({userFollowing: uid, userFollowed: followedId});

    findFollowingOfUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();

    findFollowersOfUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();

}
