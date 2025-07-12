
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "خطای ۴۰۴: کاربر سعی در دسترسی به مسیر غیرموجود داشت:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" dir="rtl">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">۴۰۴</h1>
        <p className="text-xl text-gray-600 mb-4">اوه! صفحه پیدا نشد</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          بازگشت به خانه
        </a>
      </div>
    </div>
  );
};

export default NotFound;
