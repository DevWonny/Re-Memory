// * 각종 확인 모달 컴포넌트.
// * 회원가입 완료 / 탈퇴 완료 등등

interface ModalType {
  type: string;
}

export default function CommonModal({ type }: ModalType) {
  return (
    <div className="common-modal-container">
      <p>Common Modal</p>
    </div>
  );
}
