import { StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useUpdates } from "../../hooks/useUpdates";

import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedTextInput from "../../components/ThemedTextInput";
import ThemedButton from "../../components/ThemedButton";
import Spacer from "../../components/Spacer";

const Create = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const { createUpdate, isStaff } = useUpdates();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title.trim() || !author.trim() || !content.trim()) return;

    setLoading(true);

    try {
      await createUpdate({
        Title: title,
        Author: author,
        Content: content,
        Date: date,
      });

      setTitle("");
      setAuthor("");
      setContent("");
      setDate("");

      router.replace("/updates");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isStaff) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText title style={styles.heading}>
          Access Denied
        </ThemedText>
        <Spacer />
        <ThemedText style={{ textAlign: 'center', padding: 20 }}>
          Only staff members can create updates.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <ThemedText title style={styles.heading}>
          Create a New Update
        </ThemedText>

        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="DD/MM/YYYY"
          value={date}
          onChangeText={setDate}
        />

        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Update Title"
          value={title}
          onChangeText={setTitle}
        />

        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Author"
          value={author}
          onChangeText={setAuthor}
        />

        <Spacer />

        <ThemedTextInput
          style={styles.multiline}
          placeholder="Update Content"
          value={content}
          onChangeText={setContent}
          multiline
        />

        <Spacer />

        <ThemedButton onPress={handleSubmit} disabled={loading}>
          <Text style={{ color: "#fff" }}>
            {loading ? "Saving..." : "Create Update"}
          </Text>
        </ThemedButton>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    padding: 20,
    borderRadius: 6,
    alignSelf: "stretch",
    marginHorizontal: 40,
  },
  multiline: {
    padding: 20,
    borderRadius: 6,
    minHeight: 100,
    alignSelf: "stretch",
    marginHorizontal: 40,
  },
});