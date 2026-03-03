// * 모달 컴포넌트.
// * Type -> 회원가입 완료(sign confirm) / 탈퇴 경고(withdrawal warning) / 탈퇴 완료(withdrawal confirm) / 게시물 삭제 경고(folder delete warning)
// store
import { useModalStore } from "@/store/modal";
// style
import "@/styles/components/commonModal.scss";

// type
import { ModalType } from "@/store/modal";
interface ModalConfig {
  title: string;
  description: string;
  confirm: string;
  cancel?: string;
}

interface ModalParams {
  onConfirmClick: () => void;
  onCancelClick?: () => void;
}

export default function CommonModal({
  onConfirmClick,
  onCancelClick,
}: ModalParams) {
  const { type } = useModalStore();
  const modalConfig: Record<ModalType, ModalConfig> = {
    SIGNUP_COMPLETE: {
      title: "회원가입 완료",
      description: "당신의 추억을 저장해보세요!",
      confirm: "확인",
    },
    WITHDRAW_WARNING: {
      title: "정말 탈퇴하시겠습니까?",
      description: "모든 정보는 삭제됩니다.",
      confirm: "탈퇴",
      cancel: "취소",
    },
    WITHDRAW_COMPLETE: {
      title: "회원탈퇴 완료",
      description: "그동안 이용해주셔서 감사합니다.",
      confirm: "확인",
    },
    FOLDER_DELETE: {
      title: "폴더 삭제",
      description: "당신의 추억을 지우시겠습니까?",
      confirm: "삭제",
      cancel: "취소",
    },
  };

  if (!type) return null;
  const config = modalConfig[type];

  return (
    <div className="common-modal-container fixed flex flex-col items-center justify-center gap-[20px]">
      <div className="modal-contents flex flex-col items-center justify-center gap-[5px]">
        <h3>{config.title}</h3>
        <p>{config.description}</p>
      </div>

      <div
        className={`modal-button-contents flex ${config.cancel && "gap-[20px]"}`}
      >
        {config.cancel && (
          <button className="cancel-button" onClick={onCancelClick}>
            {config.cancel}
          </button>
        )}
        <button className="confirm-button" onClick={onConfirmClick}>
          {config.confirm}
        </button>
      </div>
    </div>
  );
}
