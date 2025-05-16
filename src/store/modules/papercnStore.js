// src\store\moduls\paperStore.js
import { createSlice } from "@reduxjs/toolkit";
import {getJournalLevel } from "@/apis/paper";
import {getPaperCnInfo}from "@/apis/papercn"
const papercnStore = createSlice({
    name: "papercn",
    initialState: {
        papercninfo:{
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
        papercnpdfcmpinfo:{
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
            setPaperCnInfo: (state, action) => {
                state.papercninfo = {
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
            setPaperCnPdfCmpInfo: (state, action) => {
                state.papercnpdfcmpinfo = {
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
            setPaperCnEditorInfo: (state, action) => {
                state.papercninfo = {
                    ...state.papercninfo, // 保留原有字段
                    ...action.payload,  // 覆盖新字段                   
                }
            }
        }
});


const {setPaperCnInfo,setPaperCnPdfCmpInfo,setJournalLevel,setPaperCnEditorInfo} = papercnStore.actions;

const fetchPaperCnInfo = (title) => {
    return async (dispatch) => {
        try {
            const res = await getPaperCnInfo(title);
            dispatch(setPaperCnInfo(res.data));
            return res.data;
        } catch (error) {
            dispatch(setPaperCnInfo({}));
            throw new Error("论文信息获取失败")
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

const papercnReducer = papercnStore.reducer;
export { fetchPaperCnInfo,setPaperCnPdfCmpInfo,fetchJournalLevel,setJournalLevel,setPaperCnEditorInfo,setPaperCnInfo};
export default papercnReducer;