import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/store/auth';
import { useLoading } from '@/store/loading';
import { useModalStore } from '@/store/modal';

export const useAuthForm = (type: string, onClose: () => void) => {
  const [values, setValues] = useState({ id: '', pw: '', pwCheck: '' });
  const [errors, setErrors] = useState({ id: '', pw: '', pwCheck: '' });
  const setSession = useAuth(state => state.setSession);
  const setIsLoading = useLoading(state => state.setIsLoading);
  const openModal = useModalStore(state => state.openModal);

  // 유효성 검사
  const validate = () => {
    console.log(1)
    const newErrors = { id: '', pw: '', pwCheck: '' };
    let isValid = true;
    const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;


    if (!values.id.includes('@')) {
      newErrors.id = '올바른 이메일 형식이 아닙니다.';
      isValid = false;
    }

    if (!pwRegex.test(values.pw)) {
      newErrors.pw = "비밀번호 형식이 올바르지 않습니다.";
      isValid = false;
    }

    if (type === 'register' && values.pw !== values.pwCheck) {
      newErrors.pwCheck = '비밀번호가 일치하지 않습니다.';
      isValid = false;
    }

    setErrors(newErrors);
    console.log(errors)
    return isValid;
  }

  const handleAuth = async () => {
    if (!validate()) return;
    setIsLoading(true);

    if (type === 'register') {
      const displayName = values.id.split('@')[0];
      const { error } = await supabase.auth.signUp({
        email: values.id,
        password: values.pw,
        options: {
          data: {
            displayName
          }
        }
      });

      if (error) {
        console.log('Auth Register Error(useAuthForm) - ', error);
        setIsLoading(false);
        return;
      } else {
        setIsLoading(false);
        openModal('SIGNUP_COMPLETE');
        onClose();
      }
    } else if (type === 'login') {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.id,
        password: values.pw
      });

      if (error) {
        setIsLoading(false);
        console.log('Login Error(useAuthForm) - ', error);
        return;
      } else {
        setIsLoading(false);
        setSession(data.session);
        onClose();
      }

    }

  }
  return { values, setValues, errors, handleAuth };
}