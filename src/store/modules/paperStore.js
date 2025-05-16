// src\store\moduls\paperStore.js
import { createSlice } from "@reduxjs/toolkit";
import { getPaperInfo, getPaperInfoByDoi,getJournalLevel } from "@/apis/paper";

const paperStore = createSlice({
    name: "paper",
    initialState: {
        paperinfo:{
            title: '',
            authors: [],
            affiliations: [],
            authoraffmaps: [],
            journal_name: '',
            url: '',
            co_author: [],
            corresponding_author: [],
            pubdatevolissue: '',
            funding: '',
            journal_partition: [],
            top_journal_flag: '',
            impact_factor: 0,
            impact_factor_year: "",
        },
        paperpdfcmpinfo:{
            title: '',
            authors: [],
            affiliations: [],
            authoraffmaps: [],
            journal_name: '',
            url: '',
            co_author: [],
            corresponding_author: [],
            pubdatevolissue: '',
            funding: '',
            journal_partition: [],
            top_journal_flag: '',
            impact_factor: 0,
            impact_factor_year: ""
        },
        journal_level:""
        },
        reducers: {
            setPaperEnInfo: (state, action) => {
                state.paperinfo = {
                    title: action.payload.title,
                    authors: action.payload.authors,
                    affiliations: action.payload.affiliations,
                    authoraffmaps: action.payload.authoraffmaps,
                    journal_name: action.payload.journal_name,
                    url: action.payload.url,
                    co_author: action.payload.co_author,
                    corresponding_author: action.payload.corresponding_author,
                    pubdatevolissue: action.payload.pubdatevolissue,
                    funding: action.payload.funding,
                    journal_partition: action.payload.journal_partition,
                    top_journal_flag: action.payload.top_journal_flag,
                    impact_factor: action.payload.impact_factor,
                    impact_factor_year: action.payload.impact_factor_year
                }
            },
            setPaperEnPdfCmpInfo: (state, action) => {
                state.paperpdfcmpinfo = {
                    title: action.payload.title,
                    authors: action.payload.authors,
                    affiliations: action.payload.affiliations,
                    authoraffmaps: action.payload.authoraffmaps,
                    journal_name: action.payload.journal_name,
                    url: action.payload.url,
                    co_author: action.payload.co_author,
                    corresponding_author: action.payload.corresponding_author,
                    pubdatevolissue: action.payload.pubdatevolissue,
                    funding: action.payload.funding,
                    journal_partition: action.payload.journal_partition,
                    top_journal_flag: action.payload.top_journal_flag,
                    impact_factor: action.payload.impact_factor,
                    impact_factor_year: action.payload.impact_factor_year
                }
            },
            setJournalLevel:(state, action) =>{
                state.journal_level = action.payload
            },
            setPaperEnEditorInfo: (state, action) => {
                state.paperinfo = {
                    ...state.paperinfo, // 保留原有字段
                    ...action.payload,  // 覆盖新字段                   
                }
            }
        }
});


const {setPaperEnInfo,setPaperEnPdfCmpInfo,setJournalLevel,setPaperEnEditorInfo} = paperStore.actions;

const fetchPaperInfo = (title) => {
    return async (dispatch) => {
        try {
            const res = await getPaperInfo(title);
            dispatch(setPaperEnInfo(res.data));
            return res.data;
        } catch (error) {
            dispatch(setPaperEnInfo({}));
            throw new Error("论文信息获取失败")
        }
    }
}

const fetchPaperInfoByDoi = (doi) => {
    return async (dispatch) => {
        try {
            const res = await getPaperInfoByDoi(doi);
            dispatch(setPaperEnInfo(res.data));
            return res.data;
        } catch (error) {
            dispatch(setPaperEnInfo({}));
            throw new Error("DOI信息获取失败")
        }
    }

}
const fetchJournalLevel = (journal_name, journal_partition) => {
    return async (dispatch) => {
        try {
            const res = await getJournalLevel(journal_name, journal_partition);
            dispatch(setJournalLevel(res.data));
            return res.data;
        } catch (error) {
            dispatch(setJournalLevel(""));
            throw new Error("期刊级别获取失败")
        }
    }
}

const paperReducer = paperStore.reducer;
export { fetchPaperInfo, fetchPaperInfoByDoi,setPaperEnPdfCmpInfo,fetchJournalLevel,setJournalLevel,setPaperEnInfo,setPaperEnEditorInfo};
export default paperReducer;