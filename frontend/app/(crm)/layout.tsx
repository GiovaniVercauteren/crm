export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <section>{children}</section>
    </div>
  );
}
