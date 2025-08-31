import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Pagination, Spin, Typography, Card } from 'antd';
import { fetchPokerList, PokerItem } from '../services/api';
import '../styles/PokerList.css';

const { Title } = Typography;

const PokerList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pokerList, setPokerList] = useState<PokerItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const navigate = useNavigate();

  useEffect(() => {
    loadData(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const loadData = async (page: number, size: number) => {
    setLoading(true);
    try {
      const response = await fetchPokerList(page, size);
      if (response.success) {
        setPokerList(response.data);
        setTotal(response.total);
      }
    } catch (error) {
      console.error('加载扑克列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  const formatDate = (dateString: string) => {
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
    <div className="poker-list-container">
      <Title level={2} className="page-title">扑克牌列表</Title>
      
      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <List
            className="poker-list"
            dataSource={pokerList}
            renderItem={(item) => (
              <List.Item 
                key={item.id}
                onClick={() => navigate(`/detail/${item.id}`)}
                className="list-item"
              >
                <Card hoverable className="poker-card">
                  <div className="poker-item">
                    <div className="poker-title">{item.title}</div>
                    <div className="poker-time">{formatDate(item.createdAt)}</div>
                  </div>
                </Card>
              </List.Item>
            )}
          />
          
          <div className="pagination-container">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={total}
              onChange={handlePageChange}
              showSizeChanger
              showQuickJumper
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PokerList;