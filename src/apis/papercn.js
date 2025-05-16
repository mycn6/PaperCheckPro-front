// 封装和论文相关的接口函数】

import { request } from '@/utils/index';

// 1. 获取论文信息
export function getPaperCnInfo(title) {
    return request({
        url: `/api/PaperInfoQuery/paper_query/paper_cn/base_info?title=${title}`,
        method: 'GET',
    })
}

//2.分析pdf文件与网上爬取的论文信息的区别
export function getPaperCnAnalysis(paperpdfinfo, paperinfo){
    console.log(paperpdfinfo, paperinfo);
      return request.post('/api/PaperInfoQuery/paper_query/paper_cn_pdf/paper_network/data_comparison', {
        paper_pdf_info: {
          title: paperpdfinfo.title,
          authors: paperpdfinfo.authors,
          affiliations: paperpdfinfo.affiliations,
          authoraffmaps:paperpdfinfo.authoraffmaps,
          journal_name: paperpdfinfo.journal_name,
          url: paperpdfinfo.url,
          co_author: paperpdfinfo.co_author,
          corresponding_author: paperpdfinfo.corresponding_author,
          pubdatevolissue: paperpdfinfo.pubdatevolissue,
          funding: paperpdfinfo.funding
        },
        paper_network_info: {
          title: paperinfo.title,
          authors: paperinfo.authors,
          affiliations: paperinfo.affiliations,
          authoraffmaps: paperinfo.authoraffmaps,
          journal_name: paperinfo.journal_name,
          url: paperinfo.url,
          co_author: paperinfo.co_author,
          corresponding_author: paperinfo.corresponding_author,
          pubdatevolissue: paperinfo.pubdatevolissue,
          funding: paperinfo.funding
        }
      });
  };