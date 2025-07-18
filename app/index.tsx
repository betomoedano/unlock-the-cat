import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Purchases from "react-native-purchases";

const { width: screenWidth } = Dimensions.get("window");

export default function Index() {
  // Hardcoded subscription state - change this to test different states
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    getCustomerInfo();
  }, []);

  async function getCustomerInfo() {
    const customerInfo = await Purchases.getCustomerInfo();
    if (
      typeof customerInfo.entitlements.active["Premium Cats"] !== "undefined"
    ) {
      setIsSubscribed(true);
    }
  }

  return (
    <LinearGradient
      colors={["#1a1a2e", "#16213e", "#0f3460"]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>
          {isSubscribed ? "Your Majestic Feline" : "Mystery Cat"}
        </Text>

        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://cataas.com/cat/cute",
            }}
            style={styles.catImage}
            resizeMode="cover"
          />

          {!isSubscribed && (
            <>
              {Platform.OS === "ios" ? (
                <BlurView intensity={95} style={styles.blurOverlay} />
              ) : (
                <View style={styles.androidBlurOverlay} />
              )}

              <View style={styles.lockIconContainer}>
                <Ionicons name="lock-closed" size={60} color="white" />
              </View>
            </>
          )}
        </View>

        {isSubscribed ? (
          <View style={styles.subscribedContent}>
            <Text style={styles.caption}>
              You&apos;ve earned this whiskered reward! 🐱
            </Text>
            <Text style={styles.subCaption}>
              Enjoy your daily dose of feline perfection
            </Text>
          </View>
        ) : (
          <View style={styles.lockedContent}>
            <Text style={styles.lockedText}>
              Subscribe to reveal this majestic feline
            </Text>
            <Text style={styles.lockedSubtext}>
              Unlock unlimited access to adorable cats
            </Text>

            <Link href="/subscription" asChild testID="unlock-cat-button">
              <TouchableOpacity style={styles.unlockButton}>
                <LinearGradient
                  colors={["#e94560", "#f27121"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  <Ionicons name="sparkles" size={20} color="white" />
                  <Text style={styles.buttonText}>Unlock Cat</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Link>
          </View>
        )}

        {/* Debug toggle - remove in production */}
        <TouchableOpacity
          style={styles.debugButton}
          onPress={() => setIsSubscribed(!isSubscribed)}
        >
          <Text style={styles.debugText}>
            DEBUG: Toggle Subscription ({isSubscribed ? "ON" : "OFF"})
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
    textAlign: "center",
  },
  imageContainer: {
    width: screenWidth * 0.85,
    height: screenWidth * 0.85,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  catImage: {
    width: "100%",
    height: "100%",
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  androidBlurOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
  },
  lockIconContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },
  subscribedContent: {
    marginTop: 30,
    alignItems: "center",
  },
  caption: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  subCaption: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
  },
  lockedContent: {
    marginTop: 30,
    alignItems: "center",
  },
  lockedText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  lockedSubtext: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    marginBottom: 30,
  },
  unlockButton: {
    overflow: "hidden",
    borderRadius: 30,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 15,
    gap: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  debugButton: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  debugText: {
    color: "white",
    fontSize: 12,
  },
});
