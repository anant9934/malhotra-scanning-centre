import React, { useState } from 'react';
import styles from '@/app/admin/admin.module.css';

/**
 * An inline editable field component for the admin dashboard.
 * 
 * @param value - The initial value
 * @param onSave - Async callback when the value is saved
 * @param prefix - Optional string prefix
 * @param suffix - Optional string suffix
 */
export function EditableField({ 
  value, 
  onSave, 
  prefix = '', 
  suffix = '' 
}: {
  value: string; 
  onSave: (v: string) => Promise<void>; 
  prefix?: string; 
  suffix?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    await onSave(draft);
    setSaving(false);
    setEditing(false);
  };

  if (editing) return (
    <span className={styles.inlineEdit}>
      {prefix}
      <input 
        className={styles.inlineInput} 
        value={draft} 
        onChange={e => setDraft(e.target.value)}
        onKeyDown={e => { 
          if (e.key === 'Enter') save(); 
          if (e.key === 'Escape') setEditing(false); 
        }}
        autoFocus 
      />
      {suffix}
      <button className={styles.inlineSave} onClick={save} disabled={saving}>
        {saving ? '…' : '✓'}
      </button>
      <button className={styles.inlineCancel} onClick={() => setEditing(false)}>✕</button>
    </span>
  );

  return (
    <span className={styles.editableValue} onClick={() => { setDraft(value); setEditing(true); }}>
      {prefix}{value}{suffix} <span className={styles.editPencil}>✏️</span>
    </span>
  );
}
