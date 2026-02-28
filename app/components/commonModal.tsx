// * 모달 컴포넌트.
// * Type -> 회원가입 완료(sign confirm) / 탈퇴 경고(withdrawal warning) / 탈퇴 완료(withdrawal confirm) / 게시물 삭제 경고(folder delete warning)
// style
import "@/styles/components/commonModal.scss";

interface ModalType {
  type: string;
  title?: string;
  description?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function CommonModal() {
  return (
    <div className="common-modal-container absolute flex flex-col items-center justify-center ">
      <div className="modal-contents flex flex-col items-center justify-center">
        <h3>회원가입 완료</h3>
        <p>당신의 추억을 저장해보세요!</p>
      </div>

      <div className="modal-button-contents flex">
        <button className="confirm-button">확인</button>
      </div>
    </div>
  );
}
