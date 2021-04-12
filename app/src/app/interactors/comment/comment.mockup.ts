/* #region  Imports */
import { StorageAsyncResult } from "src/app/models/interfaces/storage-async-results"
import { CommentProxy, getFakeCommentProxy } from "src/app/models/proxies/comment.proxy"
/* #endregion */


export async function getMyCommentsMockup(): Promise<StorageAsyncResult<CommentProxy[]>>{
    return Promise.resolve({
        error: undefined,
        success: [
            getFakeCommentProxy(),
            getFakeCommentProxy(),
            getFakeCommentProxy(),
            getFakeCommentProxy(),
            getFakeCommentProxy(),
            getFakeCommentProxy(),
        ],
    });
}
