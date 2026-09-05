import React, { useMemo, useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import { Appointment } from '@/types';

interface AppointmentsTableProps {
  appointments: Appointment[];
  isRefreshing: boolean;
  onStatusChange: (id: string, newStatus: string) => void;
  onDelete: (id: string) => void;
}

export function AppointmentsTable({ appointments, isRefreshing, onStatusChange, onDelete }: AppointmentsTableProps) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCentre, setFilterCentre] = useState('All');
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);

  const centreList = ['All', ...Array.from(new Set(appointments.map(a => a.preferredCentre)))];

  const filtered = useMemo(() => appointments.filter(a => {
    const s = search.toLowerCase();
    const matchSearch = !search || a.patientName.toLowerCase().includes(s) || a.phoneNumber.includes(s) || a.investigation.toLowerCase().includes(s);
    const matchStatus = filterStatus === 'All' || a.status === filterStatus;
    const matchCentre = filterCentre === 'All' || a.preferredCentre === filterCentre;
    return matchSearch && matchStatus && matchCentre;
  }), [appointments, search, filterStatus, filterCentre]);

  const exportCSV = () => {
    const hdr = ['Date', 'Patient', 'Phone', 'Investigation', 'Centre', 'Preferred Date', 'Time', 'Status', 'Notes'];
    const rows = filtered.map(a => [
      new Date(a.createdAt).toLocaleString(), a.patientName, a.phoneNumber,
      a.investigation, a.preferredCentre, a.preferredDate, a.preferredTime, a.status, a.message || '',
    ]);
    const csv = [hdr, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    Object.assign(document.createElement('a'), { href: url, download: `appointments-${new Date().toISOString().slice(0,10)}.csv` }).click();
    URL.revokeObjectURL(url);
  };

  const badge = (status: string) => ({ Pending: styles.badgePending, Confirmed: styles.badgeConfirmed, Cancelled: styles.badgeCancelled }[status] || styles.badgePending);

  return (
    <div className={styles.section}>
      <div className={styles.toolbar}>
        <input className={styles.search} placeholder="🔍  Search name, phone, investigation…" value={search} onChange={e => setSearch(e.target.value)} />
        <select className={styles.select} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <select className={styles.select} value={filterCentre} onChange={e => setFilterCentre(e.target.value)}>
          {centreList.map(c => <option key={c} value={c}>{c === 'All' ? 'All Centres' : c}</option>)}
        </select>
        <button className={styles.exportBtn} onClick={exportCSV}>⬇ Export CSV</button>
      </div>

      <p className={styles.resultCount}>Showing <strong>{filtered.length}</strong> of <strong>{appointments.length}</strong></p>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th><th>Received</th><th>Patient</th><th>Investigation</th>
              <th>Centre</th><th>Slot</th><th>Status</th><th>Update</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9} className={styles.emptyCell}>📋 No appointments match your filters.</td></tr>
            ) : filtered.map((apt, i) => (
              <tr key={apt.id} className={`${styles.row} ${apt.status === 'Pending' ? styles.rowPending : ''}`}>
                <td className={styles.tdNum}>{i + 1}</td>
                <td>
                  <span className={styles.dateMain}>{new Date(apt.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                  <span className={styles.dateSub}>{new Date(apt.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                </td>
                <td>
                  <strong className={styles.ptName}>{apt.patientName}</strong>
                  <a href={`tel:${apt.phoneNumber}`} className={styles.ptPhone}>{apt.phoneNumber}</a>
                </td>
                <td><span className={styles.invTag}>{apt.investigation}</span></td>
                <td><span className={apt.preferredCentre?.includes('Maqsudan') ? styles.tagBlue : styles.tagPurple}>{apt.preferredCentre}</span></td>
                <td>
                  <span className={styles.dateMain}>{apt.preferredDate}</span>
                  <span className={styles.dateSub}>{apt.preferredTime}</span>
                </td>
                <td><span className={`${styles.badge} ${badge(apt.status)}`}>{apt.status}</span></td>
                <td>
                  <select className={styles.miniSelect} value={apt.status}
                    onChange={e => onStatusChange(apt.id, e.target.value)} disabled={isRefreshing}>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className={styles.actionCell}>
                  <button className={styles.viewBtn} onClick={() => setSelectedApt(apt)}>View</button>
                  <button className={styles.delBtn} onClick={() => onDelete(apt.id)}>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAIL MODAL */}
      {selectedApt && (
        <div className={styles.overlay} onClick={() => setSelectedApt(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalTop}>
              <h3>Appointment Detail</h3>
              <button className={styles.modalX} onClick={() => setSelectedApt(null)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalGrid}>
                {[
                  ['PATIENT', selectedApt.patientName],
                  ['PHONE', selectedApt.phoneNumber],
                  ['INVESTIGATION', selectedApt.investigation],
                  ['CENTRE', selectedApt.preferredCentre],
                  ['DATE', selectedApt.preferredDate],
                  ['TIME', selectedApt.preferredTime],
                  ['STATUS', null],
                  ['RECEIVED', new Date(selectedApt.createdAt).toLocaleString()],
                ].map(([label, val]) => (
                  <div key={label as string} className={styles.mf}>
                    <span className={styles.mfLabel}>{label}</span>
                    {label === 'STATUS'
                      ? <span className={`${styles.badge} ${badge(selectedApt.status)}`}>{selectedApt.status}</span>
                      : label === 'PHONE'
                        ? <a href={`tel:${val}`} className={styles.mfPhone}>{val}</a>
                        : <span className={styles.mfValue}>{val}</span>
                    }
                  </div>
                ))}
              </div>
              {selectedApt.message && (
                <div className={styles.mfNote}>
                  <span className={styles.mfLabel}>NOTES / SYMPTOMS</span>
                  <p>{selectedApt.message}</p>
                </div>
              )}
              <div className={styles.modalActions}>
                <a href={`tel:${selectedApt.phoneNumber}`} className={styles.btnCall}>📞 Call</a>
                <a href={`https://wa.me/91${selectedApt.phoneNumber}`} target="_blank" rel="noopener noreferrer" className={styles.btnWa}>💬 WhatsApp</a>
                <select className={styles.modalSelect} value={selectedApt.status}
                  onChange={async e => { onStatusChange(selectedApt.id, e.target.value); setSelectedApt({ ...selectedApt, status: e.target.value }); }}
                  disabled={isRefreshing}>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <button className={styles.btnDel} onClick={() => { onDelete(selectedApt.id); setSelectedApt(null); }}>🗑 Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
