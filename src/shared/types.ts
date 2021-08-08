export interface DbData {
  stats: Record<
    string, // 日期
    Record<
      string, // 应用名
      Record<
        string, // 应用标题
        number
      >
    >
  >;
}
