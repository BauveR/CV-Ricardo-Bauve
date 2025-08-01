type HeaderProfileProps = {
  fullName: string;
  firstNameColor?: string;
  lastNameColor?: string;
  imageUrl: string;
  badge?: string;
};

export const HeaderProfile = ({
  fullName,
  imageUrl,
  badge = "✅ Documentación en regla y permiso de trabajo",
  firstNameColor = "text-pink-600",
  lastNameColor = "text-purple-800",
}: HeaderProfileProps) => {
  const [firstName, ...rest] = fullName.split(" ");
  const lastName = rest.join(" ");

  return (
    <div className="flex justify-between items-start gap-4">
      <div className="flex items-center gap-4">
        <img
          src={imageUrl}
          alt={fullName}
          className="w-32 h-32 rounded-full object-cover"
        />
        <h1 className="text-3xl font-bold leading-tight">
          <span className={`${firstNameColor}`}>{firstName}</span>
          <br />
          <span className={`${lastNameColor}`}>{lastName}</span>
        </h1>
      </div>
      <div className="bg-pink-100 text-pink-800 text-sm px-4 py-2 rounded-full shadow">
        {badge}
      </div>
    </div>
  );
};
