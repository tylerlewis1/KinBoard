import { userContext } from '@/app/background/Users';
import { Ionicons } from "@expo/vector-icons";
import { Image } from 'expo-image';
import { useContext, useState } from "react";
import { ActivityIndicator, Dimensions, Text, TouchableOpacity, View } from "react-native";
import AnnouncementModal from "./announcementModal";
import { useStyle } from "./announcments.style";
import { useAnnouncements } from "./useAnnouncements";
export default function Announcements({circleData, announcments, colors}) {
    const { width, height } = Dimensions.get("window");
    const hp = (percent) => height * (percent / 100);
    const [modalVis, setModalVis] = useState(false);
    const style = useStyle(colors);
    const user = useContext(userContext);
    const logic = useAnnouncements(circleData, announcments, user.userData);

    if(!announcments) {
        return(
            <View style={style.loadingContainer}>
                <ActivityIndicator size="large" color="#2EC4B6"/>
            </View>
        )
    }
    
    const totalVotes = announcments.options?.reduce((sum, opt) => sum + opt.votes, 0) || 0;
    
    return(
        <View style={style.container}>
            {/* Modal */}
            <AnnouncementModal style={style} modalVis={modalVis} setModalVis={setModalVis} hp={hp} logic={logic}/>
            {/* Announcement Card */}
            <View style={style.card}>
                {/* Card Header */}
                <View style={style.cardHeader}>
                    <View style={style.userInfo}>
                        {announcments.pfp ? (
                            <Image style={style.avatar} source={{uri: announcments.pfp}}/>
                        ) : (
                            <Image 
                                cachePolicy="disk" 
                                style={style.avatar} 
                                source={require("../../../../../assets/images/logotb.png")}
                            />
                        )}
                        <View style={style.userDetails}>
                            <Text style={style.userName}>{announcments.who}</Text>
                            <Text style={style.timestamp}>
                                {announcments.date?.toDate?.()?.toLocaleString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit'
                                })}
                            </Text>
                        </View>
                    </View>
                    
                    <TouchableOpacity 
                        style={style.createBtn} 
                        onPress={() => logic.setModalVis(true)}
                    >
                        <Ionicons name="add" size={hp(2.5)} color={colors.txt}/>
                        <Text style={style.createBtnText}>Create</Text>
                    </TouchableOpacity>
                </View>
                
                {/* Message Content */}
                <View style={style.messageContainer}>
                    <Text style={style.messageText}>{announcments.msg}</Text>
                </View>
                
                {/* Poll Options */}
                {announcments.options && (
                    <View style={style.pollContainer}>
                        {announcments.options.map((option, index) => {
                            const percentage = totalVotes > 0 
                                ? Math.round((option.votes / totalVotes) * 100) 
                                : 0;
                            
                            return(
                                <TouchableOpacity 
                                    key={option.id} 
                                    style={[
                                        style.pollOption,
                                        logic.hasVoted && style.pollOptionVoted
                                    ]} 
                                    onPress={() => logic.vote(option.id)} 
                                    disabled={logic.hasVoted}
                                    activeOpacity={logic.hasVoted ? 1 : 0.7}
                                >
                                    {logic.hasVoted && (
                                        <View 
                                            style={[
                                                style.pollBar,
                                                { width: `${percentage}%` }
                                            ]}
                                        />
                                    )}
                                    <View style={style.pollContent}>
                                        <View style={style.pollTextContainer}>
                                            <View style={style.pollDot}/>
                                            <Text style={style.pollOptionText}>{option.txt}</Text>
                                        </View>
                                        <View style={style.pollStats}>
                                            {logic.hasVoted && (
                                                <Text style={style.pollPercentage}>{percentage}%</Text>
                                            )}
                                            <Text style={style.pollVotes}>{option.votes}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity> 
                            );
                        })}
                        {logic.hasVoted && totalVotes > 0 && (
                            <Text style={style.totalVotes}>{totalVotes} vote{totalVotes !== 1 ? 's' : ''}</Text>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
}
