const voicevoxAPI = async (text, speaker) => {
  const audioQuery = await fetch(
    `${process.env.VOICEVOX_API_BASE_URL}/audio_query?speaker=${speaker}&text=${text}`,
    { method: "POST" }
  );

  const synthesis = await fetch(
    `${process.env.VOICEVOX_API_BASE_URL}/synthesis?speaker=${speaker}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: await audioQuery.text(),
    }
  );

  return synthesis.arrayBuffer();
};

export default voicevoxAPI;
