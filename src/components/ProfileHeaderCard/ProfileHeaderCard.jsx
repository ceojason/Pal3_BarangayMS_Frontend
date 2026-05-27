import React from 'react';

class ProfileHeaderCard extends React.Component {
  handleFileChange = (e) => {
    if (this.props.onImageUpload) {
      this.props.onImageUpload(e);
    }
  };

  render() {
    const {
      profileImage,
      imageSaved,
      firstName,
      lastName,
      subText,
      activeSince,
      onImageUploadLabel = "Change Photo"
    } = this.props;

    return (
      <div style={styles.card}>
        <div style={styles.container}>

          {/* Avatar Section */}
          <div style={styles.avatarWrapper}>
            {profileImage ? (
              <img src={profileImage} alt="Profile" style={styles.avatar} />
            ) : (
              <i className="bi bi-person-circle" style={styles.avatarIcon} />
            )}

            {imageSaved && (
              <div style={styles.savedTag}>
                <i className="bi bi-check-circle-fill" /> Saved ✓
              </div>
            )}

            <label style={styles.uploadLabel}>
              {onImageUploadLabel}
              <input type="file" hidden onChange={this.handleFileChange} />
            </label>
          </div>

          {/* Info Section */}
          <div>
            <div style={styles.name}>
              {firstName} {lastName}
            </div>

            {subText && <div style={styles.subText}>{subText}</div>}

            {activeSince && (
              <div style={styles.mutedText}>
                Active since: {activeSince}
              </div>
            )}
          </div>

        </div>
      </div>
    );
  }
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: '24px',
    padding: '35px',
    marginBottom: '25px',
    boxShadow: '0 6px 24px rgba(0,0,0,0.06)',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    flexWrap: 'wrap',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  avatarIcon: {
    fontSize: 90,
    color: '#9ca3af',
  },
  uploadLabel: {
    display: 'inline-block',
    marginTop: 10,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    color: '#2563eb',
  },
  savedTag: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    background: 'rgba(16,185,129,0.15)',
    color: 'var(--main-green)',
    padding: '4px 10px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
  },
  name: {
    fontSize: 32,
    fontWeight: 700,
    color: '#5C5757',
  },
  subText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--main-green)',
    background: 'rgba(16,185,129,0.12)',
    padding: '8px 14px',
    borderRadius: 999,
    display: 'inline-block',
  },
  mutedText: {
    marginTop: 18,
    fontSize: 14,
    color: '#4b5563',
  },
};

export default ProfileHeaderCard;