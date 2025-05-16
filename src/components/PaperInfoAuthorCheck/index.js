
import { useState } from "react";
import {
    Input,
    Button,
    Alert,
    Descriptions,
    Typography,
    Flex

} from "antd";
import { checkAuthor } from "@/apis/paper";
const { Text } = Typography;


const PaperInfoAuthorCheck = ({ authors, co_author, corresponding_author, authors_workload_list }) => {
    // ...原有state保持不变...
    const [declaredAuthorName, setDeclaredAuthorName] = useState("");
    const [validationResult, setValidationResult] = useState(null);
    const [validating, setValidating] = useState(false);
    const [errorValidation, setErrorValidation] = useState(null);

    // 新增验证函数
    const validateDeclaredAuthor = async () => {
        if (!declaredAuthorName.trim()) return;

        try {
            setValidating(true);
            setErrorValidation(null);
            const response = await checkAuthor(declaredAuthorName,authors, co_author, corresponding_author, authors_workload_list);
            setValidationResult(response.data);
        } catch (err) {
            setErrorValidation("验证失败，请稍后重试");
            setValidationResult(null);
        } finally {
            setValidating(false);
        }
    };

    return (
        <>
            <Descriptions
                title="工作量申报作者验证"
                column={2}
                bordered
                labelStyle={{
                    width: 160,
                    fontWeight: 600,
                    backgroundColor: '#fafafa'
                }}
                style={{ marginTop: 10 }}
            >
                <Descriptions.Item label="申报作者姓名" span={2}>
                <Flex gap={8}>
                        <Input
                            placeholder="输入申报作者姓名"
                            value={declaredAuthorName}
                            onChange={(e) => {
                                setDeclaredAuthorName(e.target.value);
                                setValidationResult(null);
                            }}
                        />
                        <Button
                            type="primary"
                            onClick={validateDeclaredAuthor}
                            loading={validating}
                            disabled={!declaredAuthorName.trim()}
                        >
                            验证身份
                        </Button>
                </Flex>
                </Descriptions.Item>

                {validationResult && (
                    <>
                        <Descriptions.Item label="第一作者验证">
                            <Text strong >
                                {validationResult["是否是第一作者"]}
                            </Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="通讯作者验证">
                            <Text strong>
                                {validationResult["是否是通讯作者"]}
                            </Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="工作量申请作者的工作量">
                            <Text strong>
                                {validationResult["作者的工作量"]}
                            </Text>
                        </Descriptions.Item>
                    </>
                )}

                {errorValidation && (
                    <Descriptions.Item label="验证错误" span={2}>
                        <Alert
                            message={errorValidation}
                            type="error"
                            showIcon
                            closable
                            onClose={() => setErrorValidation(null)}
                        />
                    </Descriptions.Item>
                )}
            </Descriptions>
        </>
    )
}

export default PaperInfoAuthorCheck