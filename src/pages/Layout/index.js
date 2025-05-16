import { Layout } from 'antd'
import './index.css'
import { Outlet,useNavigate } from 'react-router-dom'
const { Header} = Layout

const PaperCheckProLayout = () => {
     // 2. 获取 navigate 函数
     const navigate = useNavigate()

     // 3. 创建点击处理函数
     const handleBackToHome = () => {
         navigate('/') // 导航到根路径
     }
    return (
        <Layout>
             <Header className="header">
                <div style={{ float: 'right' }} />
                <div className="logo-box" onClick={handleBackToHome} style={{ cursor: 'pointer' }}>
                    <div className="logo" />
                    <div className="logo-title">科研管理智能助手</div>
                </div>
            </Header>
            <Layout>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
        )
}
export default PaperCheckProLayout;
