// * 회원탈퇴 로직
// * 스토리지 이미지 삭제 -> 게시글 삭제 -> 유저 정보 삭제

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const withdrawUser = async (userId: string) => {
  // * 스토리지 삭제
  const { data: images } = await supabaseAdmin.storage.from('images').list(`${userId}`);

  if (images && images.length > 0) {
    await supabaseAdmin.storage.from('images').remove(images.map(img => `${userId}/${img.name}`))
  }

  // * 게시글 삭제
  await supabaseAdmin.from('folder').delete().eq('user_id', userId);

  // * 유저 정보 삭제
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) {
    console.log('Withdraw Error!');
    throw new Error(error.message);
  }
}