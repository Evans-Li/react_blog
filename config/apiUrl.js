let ipUrl =  ''
if (process.env.NODE_ENV == 'development') {
  ipUrl = 'http://127.0.0.1:7001/default/'
} else if (process.env.NODE_ENV == 'production') {
  ipUrl = 'http://jsv5.tk:7001/default/'
}

export const serviceUrl = {
  getArticleList: ipUrl + 'getArticleList', //首页数据
  getArticleById: ipUrl + 'getArticleById/', // 根据id获取文章详情
  getTypeInfo: ipUrl + 'getTypeInfo',       // 文航类别
  getListById: ipUrl + 'getListById/',        // 根据类别获取文章列表
  addComment:ipUrl + 'addComment', // 添加评论
  getAllPartCount:ipUrl + 'getAllPartCount',    // 获取所有浏览数与文章数
  getCommentListById:ipUrl + 'getCommentListById/', // 根据文章ID获取评论
  getLikeCount: ipUrl+'getLikeCount/',  //获取文章点赞数
  doLike: ipUrl+'doLike', //点赞文章
  getArticleCommentCountById: ipUrl+'getArticleCommentCountById/', // 获取文章评论总数
  getArticle: ipUrl + 'getArticle' , // 首页文章list
  getTopArticle: ipUrl + 'getTopArticle' ,// 置顶文章
  getListByIdLoadMore: ipUrl + 'getListByIdLoadMore'  // List页面 loadMore
} 