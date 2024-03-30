import React from "react";
import styled, { keyframes } from "styled-components";
import { useAtom } from "jotai";
import { notificationAtom } from "../../stores/notification";
import bell from "../../assets/svg/bell-ring.svg";
import { useEffect, useState } from "react";

interface ModalContainerProps {
  isAnimating: boolean;
}
const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const ModalContainer = styled.div<ModalContainerProps>`
  position: fixed;
  top: 3%;
  right: 15%;
  background-color: #e7faed;
  padding: 20px;
  padding-right: 60px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "GamtanRoad Dotum TTF";
  animation: ${(props) => (props.isAnimating ? slideDown : slideUp)} 1s ease-out
    forwards;
`;

const BellIcon = styled.img`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 20px;
  height: 20px;
`;

const NotificationContent = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "GamtanRoad Dotum TTF";
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  padding: 5px 10px;
  background-color: #b3e8c4;
  border-radius: 10px;
  border: none;
  color: #5d4157;
  font-family: "Comic Sans MS", "Chilanka", cursive;
  cursor: pointer;
`;
const NotificationModal: React.FC = () => {
  console.log("모달 컴포넌트 들어옴");
  const [notification, setNotification] = useAtom(notificationAtom);
  console.log("모달 컴포넌트 들어옴", notification);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (notification.show) {
      setIsAnimating(true);
      // 모달을 보여준 후 3초 뒤에 자동으로 닫힘
      const timer = setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, 3000);

      return () => {
        clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 정리
      };
    }
  }, [notification.show]); // notification.show에만 의존

  if (!notification.show) {
    return null; // show가 false면 아무 것도 렌더링하지 않음
  }

  const handleViewAlarm = () => {
    // 알림 상세 페이지로 리디렉션
    window.location.href = "/alarm";
  };

  return (
    <>
      <ModalContainer isAnimating={isAnimating}>
        <NotificationContent>
          <h4>{notification.name}</h4>
          <p>{notification.type}</p>
          <p>{notification.content}</p>
          <CloseButton
            onClick={() =>
              setNotification((prev) => ({ ...prev, show: false }))
            }
          >
            Close
          </CloseButton>
        </NotificationContent>
        <BellIcon
          src={bell}
          alt="Notification bell"
          onClick={handleViewAlarm}
        />
      </ModalContainer>
    </>
  );
};

export default NotificationModal;
