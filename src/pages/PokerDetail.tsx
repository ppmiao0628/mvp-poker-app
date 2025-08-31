import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spin, Typography, Image, Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { fetchPokerDetail, PokerItem } from '../services/api';
import '../styles/PokerDetail.css';

const { Title, Paragraph } = Typography;

const PokerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [pokerDetail, setPokerDetail] = useState<PokerItem | null>(null);

  useEffect(() => {
    if (id) {
      loadDetail(parseInt(id));
    }
  }, [id]);

  const loadDetail = async (pokerId: number) => {
    setLoading(true);
    try {
      const response = await fetchPokerDetail(pokerId);
      if (response.success) {
        setPokerDetail(response.data);
      }
    } catch (error) {
      console.error('加载扑克详情失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="detail-container">
      <Button 
        type="text" 
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        className="back-button"
      >
        返回列表
      </Button>

      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : pokerDetail ? (
        <Card className="detail-card">
          <Title level={2} className="detail-title">{pokerDetail.title}</Title>
          <div className="detail-time">发布时间: {formatDate(pokerDetail.createdAt)}</div>
          
          <div className="image-container">
            <Image
              src={pokerDetail.img}
              alt={pokerDetail.title}
              className="detail-image"
            />
          </div>
          
          <Paragraph className="detail-desc">
            {pokerDetail.desc}
          </Paragraph>
        </Card>
      ) : (
        <div className="not-found">未找到相关扑克牌信息</div>
      )}
    </div>
  );
};

export default PokerDetail;