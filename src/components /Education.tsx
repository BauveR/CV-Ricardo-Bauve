type Study = {
  title: string;
  place: string;
  year: string;
};

type EducationProps = {
  studies: Study[];
};

export const Education = ({ studies }: EducationProps) => (
  <div>
    <h2 className="text-xl font-semibold text-gray-800 mb-2">Educación</h2>
    <ul className="space-y-2">
      {studies.map((study, index) => (
        <li key={index} className="flex justify-between text-sm">
          <div>
            <p className="font-medium">{study.title}</p>
            <p className="text-gray-500">{study.place}</p>
          </div>
          <p className="text-gray-500">{study.year}</p>
        </li>
      ))}
    </ul>
  </div>
);
