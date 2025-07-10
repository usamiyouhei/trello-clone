import { useState } from "react";
import { currentUserAtom } from "../../../modules/auth/current-user.state";
import { useAtom } from "jotai";
import { accountRepository } from "../../../modules/account/account.repository";

interface SidebarProps {
  onClose: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  const [showInput, setShowInput] = useState(false);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [name, setName] = useState(currentUser?.name ?? '');



  const updateUser = async() => {
    if(name == '') return;
    try {
      const user = await accountRepository.updateProfile(name);
      setCurrentUser(user);
      setShowInput(false);
    } catch (error) {
      console.error('プロフィールの更新に失敗しました。', error);
      
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(undefined)
  }
  return (
    <>
      <div className="sidebar-overlay" onClick={onClose}/>
      <div className="sidebar">
        <div className="sidebar-header">
          <button className="sidebar-close-button" onClick={onClose}>
            ×
            </button>
            {showInput ? (
            <div className="sidebar-edit-form">
              <input
                type="text"
                placeholder="ユーザー名を入力"
                className="sidebar-name-input"
                autoFocus
                maxLength={20}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div className="sidebar-edit-actions">
                <button 
                className="sidebar-save-button"
                onClick={updateUser}
                >保存</button>
                <button 
                  className="sidebar-cancel-button"
                  onClick={() => setShowInput(false)}
                >キャンセル</button>
              </div>
            </div>
            ) : (
          <div className="sidebar-user-info">
            <div className="sidebar-user-name" title="プロフィールを編集">
              { name }
            </div>
            <button className="sidebar-edit-button" title="プロフィールを編集" onClick={() => setShowInput(true)}>
              ✏️
            </button>
          </div>
              )}
        </div>
          

        <div className="sidebar-content">
          <div className="sidebar-section">
            <button className="sidebar-board-item" onClick={logout}>
              <span className="sidebar-board-name" >ログアウト</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
