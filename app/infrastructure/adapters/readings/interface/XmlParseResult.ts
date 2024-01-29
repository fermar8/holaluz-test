export default interface XmlParseResult {
  readings: {
    reading: Array<{
      $: {
        clientID: string;
        period: string;
      };
      _: string;
    }>;
  };
}
