export const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
};

export const handleNavigation = (nav, screen, setModalVisible) => {
    setModalVisible(false);
    nav.navigate(screen);
};