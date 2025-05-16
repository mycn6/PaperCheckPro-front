// 封装和论文相关的接口函数】

import { request } from '@/utils/index';

// 1. 获取论文信息
export function getPaperInfo(title) {
    return request({
        url: `/api/PaperInfoQuery/paper_query/paper_en/base_info?title=${title}`,
        method: 'GET',
    })
}
//2.根据论文doi查询论文信息
export function getPaperInfoByDoi(doi) {
    return request({
        url: `/api/PaperInfoQuery/paper_query/paper_en/base_info/doi?doi=${doi}`,
        method: 'GET',
    })
}
//paper-check-pro-front\src\apis\paper.js
//分析pdf文件与网上爬取的论文信息的区别
export function getPaperAnalysis(paperpdfinfo, paperinfo){
  console.log(paperpdfinfo, paperinfo);
    return request.post('/api/PaperInfoQuery/paper_query/paper_pdf/paper_network/data_comparison', {
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
//3.查询期刊级别
export function getJournalLevel(journal_name, journal_partition){
  return request.post('/api/PaperInfoQuery/paper_query/paper/journal/level', {
    journal_name,
    journal_partition
  });
}
//4.分析工作量
export function getWorkloadAnalysis(journal_name, journal_partition, journal_level,top_journal_flag,authors,authoraffmaps) {
  return request.post('/api/PaperInfoQuery/paper_query/workload/analysis', {
      journal_name,
      journal_partition,
      journal_level,
      top_journal_flag,
      authors,
      authoraffmaps
    });
};
// 5. 验证工作量申报作者
export function checkAuthor(declaredAuthorName, authors, co_author, corresponding_author, authors_workload_list) {
  // 发送请求
  let declared_author_name =declaredAuthorName
  return request.post('/api/PaperInfoQuery/paper_query/paper/base_info/check/declared_author', {
    declared_author_name,
    authors,
    co_author,
    corresponding_author,
    authors_workload_list
  });
}
