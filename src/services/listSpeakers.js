import "dotenv/config";

const listSpeakers = async () => {
  const coreVersion = await fetch(
    `${process.env.VOICEVOX_API_BASE_URL}/core_versions`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  );

  const listSpeakers = await fetch(
    `${
      process.env.VOICEVOX_API_BASE_URL
    }/speakers?core_version=${await coreVersion.json()}`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  );

  return JSON.stringify(await listSpeakers.json());
};

export default listSpeakers;
