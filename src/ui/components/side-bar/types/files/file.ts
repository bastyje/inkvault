abstract class AbstractFile {
  protected constructor(name: string) {
    this.name = name;
  }

  public name: string;
}

class Directory extends AbstractFile {
  constructor(name: string, children: AbstractFile[]) {
    super(name);
    this.children = children;
  }

  public children: AbstractFile[];
}


type FileType = 'md' | 'txt'

class File_ extends AbstractFile {
  constructor(name: string, type: FileType) {
    super(name);
    this.type = type;
  }

  public type: FileType
}