import React, { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import { getAuthHeader } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import NotificationBell from "../components/NotificationBell";

export default function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem("notificationsEnabled");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "English"
  );

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("notificationsEnabled", JSON.stringify(notificationsEnabled));

    // If notifications enabled, request browser permission and show a test notification
    if (notificationsEnabled && typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission()
          .then((perm) => {
            if (perm === "granted") {
              try {
                new Notification("Notifications enabled", {
                  body: "You'll receive push notifications.",
                });
              } catch (e) {
                // ignore notification creation errors
                console.error(e);
              }
            }
          })
          .catch((err) => console.error("Notification permission error:", err));
      } else if (Notification.permission === "granted") {
        try {
          new Notification("Notifications enabled", {
            body: "You'll receive push notifications.",
          });
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [notificationsEnabled]);

  const [displayName, setDisplayName] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedProfileFile, setSelectedProfileFile] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const prevObjectUrlRef = React.useRef(null);

  React.useEffect(() => {
    return () => {
      if (prevObjectUrlRef.current) {
        URL.revokeObjectURL(prevObjectUrlRef.current);
        prevObjectUrlRef.current = null;
      }
    };
  }, []);

  const saveUserToStorage = (userObj) => {
    if (localStorage.getItem('user')) {
      localStorage.setItem('user', JSON.stringify(userObj));
    } else if (sessionStorage.getItem('user')) {
      sessionStorage.setItem('user', JSON.stringify(userObj));
    }
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/users/me`,
        { headers: getAuthHeader() }
      );

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error('Unauthorized. Please login.');
        }
        throw new Error('Failed to fetch profile');
      }

      const data = await res.json();
      const profile = data.user || data;
      setUser(profile);

      // Initialize display name
      const uname = profile ? `${profile.first_name} ${profile.last_name}` : "";
      setDisplayName(uname);
      setPreviewImage(profile?.profile_picture || null);
    } catch (err) {
      console.error(err);
      // Improve network error messages
      if (err instanceof TypeError || err.message === 'Failed to fetch') {
        setError(
          `Unable to reach backend. Make sure server is running at ${import.meta.env.VITE_API_URL || 'http://localhost:5000'}`
        );
      } else {
        setError(err.message || "Failed to load");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setSelectedProfileFile(file);
    try {
      // Revoke previous object URL if any
      if (prevObjectUrlRef.current) {
        URL.revokeObjectURL(prevObjectUrlRef.current);
        prevObjectUrlRef.current = null;
      }
      const url = URL.createObjectURL(file);
      prevObjectUrlRef.current = url;
      setPreviewImage(url);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveProfile = async () => {
    if (!displayName && !selectedProfileFile) {
      return alert('No changes to save');
    }

    setSavingProfile(true);
    try {
      const formData = new FormData();
      if (displayName) formData.append('display_name', displayName);
      if (selectedProfileFile) formData.append('profile_picture', selectedProfileFile);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/users/me`,
        {
          method: 'PATCH',
          headers: getAuthHeader(),
          body: formData,
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || 'Failed to save profile');
      }

      const data = await res.json();
      const updated = data.user || data;
      setUser(updated);
      setDisplayName(`${updated.first_name} ${updated.last_name}`);
      saveUserToStorage(updated);
      // Notify other components (Sidebar) about the update
      window.dispatchEvent(new CustomEvent('user:update', { detail: updated }));
      if (prevObjectUrlRef.current) {
        URL.revokeObjectURL(prevObjectUrlRef.current);
        prevObjectUrlRef.current = null;
      }
      setSelectedProfileFile(null);
      setPreviewImage(updated.profile_picture || null);
      alert('Profile updated');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    // Notify other components
    window.dispatchEvent(new CustomEvent('user:update', { detail: null }));
    navigate("/login");
  };

  return (
    <AppLayout>
      <div className="px-10 py-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-sm text-text-muted">These Settings appear in your user</p>
          </div>

          <div className="flex items-center gap-4">
            <NotificationBell />
          </div>
        </div>
      </div>

      <div className="px-10 py-8 space-y-7">
        {/* PROFILE */}
        <div className="rounded-2xl border-2 border-gray-300 p-6 bg-[var(--color-bg-app)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-lg">Profile</h2>
              <p className="text-sm text-text-muted">Manage your account details</p>
            </div>
          </div>

          {loading && <p className="mt-4 text-text-muted">Loading profile...</p>}
          {error && <p className="mt-4 text-red-600">{error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-[var(--color-bg-card)] p-4 rounded-lg shadow-card flex flex-col gap-3">
                <p className="text-xs text-text-muted">Display name</p>
                <input
                  value={
                    displayName !== null
                      ? displayName
                      : user
                      ? `${user.first_name} ${user.last_name}`
                      : ""
                  }
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="border rounded px-3 py-2"
                  placeholder="Your display name"
                />

                <p className="text-xs text-text-muted">Phone</p>
                <p className="font-medium">{user?.phone_number || user?.phone || "—"}</p>
              </div>

              <div className="bg-[var(--color-bg-card)] p-4 rounded-lg shadow-card flex flex-col gap-3 items-center">
                <p className="text-xs text-text-muted">Profile Photo</p>
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={previewImage || user?.profile_picture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="mt-2 inline-flex items-center gap-2 cursor-pointer bg-[var(--color-bg-input)] px-3 py-2 rounded">
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleProfileImageChange(e)}
                  />
                  Upload
                </label>
                {selectedProfileFile && (
                  <button
                    onClick={() => {
                      setSelectedProfileFile(null);
                      if (prevObjectUrlRef.current) {
                        URL.revokeObjectURL(prevObjectUrlRef.current);
                        prevObjectUrlRef.current = null;
                      }
                      setPreviewImage(null);
                    }}
                    className="text-sm text-red-600"
                  >
                    Remove
                  </button>
                )}
                <p className="text-xs text-text-muted">Email</p>
                <p className="font-medium">{user?.email_id || user?.email || "—"}</p>
              </div>

              <div className="md:col-span-3 flex justify-end mt-2">
                <button
                  onClick={handleSaveProfile}
                  disabled={savingProfile}
                  className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full ${savingProfile ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {savingProfile ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* APP SETTINGS */}
        <div className="rounded-2xl border-2 border-gray-300 p-6 bg-[var(--color-bg-app)]">
          <h2 className="font-semibold text-lg">App Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm">Change Password</p>
              </div>
              <button
                onClick={() => navigate("/forgot-password")}
                className="text-text-muted"
              >
                <FiChevronRight />
              </button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm">Language</p>
                <p className="text-xs text-text-muted">{language}</p>
              </div>
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  localStorage.setItem("language", e.target.value);
                }}
                className="rounded-md border px-2 py-1"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>

            <div className="bg-[var(--color-bg-card)] p-4 rounded-lg shadow-card flex items-center justify-between">
              <div>
                <p className="text-sm">Notification</p>
                <p className="text-xs text-text-muted">Receive push notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  aria-checked={notificationsEnabled}
                />

                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:bg-blue-600 relative transition-colors duration-200">
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 peer-checked:translate-x-5" />
                </div>
              </label>
            </div>

            <div className="bg-[var(--color-bg-card)] p-4 rounded-lg shadow-card flex items-center justify-between">
              <div>
                <p className="text-sm">Dark Mode</p>
                <p className="text-xs text-text-muted">Toggle dark theme</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:bg-gray-800 relative transition-colors duration-200">
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 peer-checked:translate-x-5" />
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* HELP */}
        <div className="rounded-2xl border-2 border-gray-300 p-6 bg-[var(--color-bg-app)]">
          <h2 className="font-semibold text-lg">Help</h2>

          <div className="flex gap-4 mt-6 flex-wrap">
            <button className="bg-[var(--color-bg-card)] px-4 py-2 rounded shadow-sm">FAQ</button>
            <button className="bg-[var(--color-bg-card)] px-4 py-2 rounded shadow-sm">Terms & condition</button>
            <button className="bg-[var(--color-bg-card)] px-4 py-2 rounded shadow-sm">Privacy Policy</button>
            <div className="flex-1" />
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-full"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
