type BlockPositions = {
  first_block : Position,
  second_block : Position,
  third_block : Position,
  main_block : Position
}

type Position = {
  top : number,
  left : number
}

type StartPositions = {
  first_block: Position,
  second_block: Position,
  third_block: Position,
  main_block: Position,
  default_position: Array<number>
}

type PositionLimit = {
  minX: number, 
  minY: number, 
  maxX: number, 
  maxY: number
}

type BlockConfiguration = {
  position: Array<number>,
  group_positions: StartPositions,
  orientation: number,
  rotate_function: Function
}

function calculateTBlockRotation(orientation : number) : BlockPositions {
    let newPositions : BlockPositions = {
      first_block : {
        top : 0,
        left : 0,
      },
      second_block : {
        top : 0,
        left : 0,
      },
      third_block : {
        top : 0,
        left : 0,
      },
      main_block : {
        top : 0,
        left : 0,
      }
    };
  
    switch (orientation) {
      case 0:
        newPositions.first_block = { top: 0, left: 30 };
        newPositions.second_block = { top: 0, left: -30 };
        newPositions.third_block = { top: 30, left: 0 };
        newPositions.main_block = { top: 0, left: 0 };
        break;
      case 90:
        newPositions.first_block = { top: -30, left: 0 };
        newPositions.second_block = { top: 30, left: 0 };
        newPositions.third_block = { top: 0, left: 30 };
        newPositions.main_block = { top: 0, left: 0 };
        break;
      case 180:
        newPositions.first_block = { top: 0, left: -30 };
        newPositions.second_block = { top: 0, left: 30 };
        newPositions.third_block = { top: -30, left: 0 };
        newPositions.main_block = { top: 0, left: 0 };
        break;
      case 270:
        newPositions.first_block = { top: 30, left: 0 };
        newPositions.second_block = { top: -30, left: 0 };
        newPositions.third_block = { top: 0, left: -30 };
        newPositions.main_block = { top: 0, left: 0 };
        break;
      default:
        break;
    }
  
    return newPositions;
  }
  
  function calculateLBlockRotation(orientation : number) : BlockPositions {
    let newPositions : BlockPositions = {
      first_block : {
        top : 0,
        left : 0,
      },
      second_block : {
        top : 0,
        left : 0,
      },
      third_block : {
        top : 0,
        left : 0,
      },
      main_block : {
        top : 0,
        left : 0,
      }
    };
  
    switch (orientation) {
      case 0:
        newPositions.first_block = { top: 30, left: -15 };
        newPositions.second_block = { top: 0, left: -15 };
        newPositions.third_block = { top: -30, left: -15 };
        newPositions.main_block = { top: 30, left: 15 };
        break;
      case 90:
        newPositions.first_block = { top: 15, left: 30 };
        newPositions.second_block = { top: 15, left: 0 };
        newPositions.third_block = { top: 15, left: -30 };
        newPositions.main_block = { top: -15, left: 30 };
        break;
      case 180:
        newPositions.first_block = { top: -30, left: 15 };
        newPositions.second_block = { top: 0, left: 15 };
        newPositions.third_block = { top: 30, left: 15 };
        newPositions.main_block = { top: -30, left: -15 };
        break;
      case 270:
        newPositions.first_block = { top: -15, left: -30 };
        newPositions.second_block = { top: -15, left: 0 };
        newPositions.third_block = { top: -15, left: 30 };
        newPositions.main_block = { top: 15, left: -30 };
        break;
      default:
        break;
    }
  
    return newPositions;
  }
  
  function calculateReverseLBlockRotation(orientation : number) : BlockPositions {
    let newPositions : BlockPositions = {
      first_block : {
        top : 0,
        left : 0,
      },
      second_block : {
        top : 0,
        left : 0,
      },
      third_block : {
        top : 0,
        left : 0,
      },
      main_block : {
        top : 0,
        left : 0,
      }
    };
  
    switch (orientation) {
      case 0:
        newPositions.first_block = { top: 30, left: 15 };
        newPositions.second_block = { top: 0, left: 15 };
        newPositions.third_block = { top: -30, left: 15 };
        newPositions.main_block = { top: 30, left: -15 };
        break;
      case 90:
        newPositions.first_block = { top: -15, left: 30 };
        newPositions.second_block = { top: -15, left: 0 };
        newPositions.third_block = { top: -15, left: -30 };
        newPositions.main_block = { top: 15, left: 30 };
        break;
      case 180:
        newPositions.first_block = { top: -30, left: -15 };
        newPositions.second_block = { top: 0, left: -15 };
        newPositions.third_block = { top: 30, left: -15 };
        newPositions.main_block = { top: -30, left: 15 };
        break;
      case 270:
        newPositions.first_block = { top: 15, left: -30 };
        newPositions.second_block = { top: 15, left: 0 };
        newPositions.third_block = { top: 15, left: 30 };
        newPositions.main_block = { top: -15, left: -30 };
        break;
      default:
        break;
    }
  
    return newPositions;
  }
  
  function calculateSquigglyBlockRotation(orientation : number) : BlockPositions {
    let newPositions : BlockPositions = {
      first_block : {
        top : 0,
        left : 0,
      },
      second_block : {
        top : 0,
        left : 0,
      },
      third_block : {
        top : 0,
        left : 0,
      },
      main_block : {
        top : 0,
        left : 0,
      }
    };
  
    switch (orientation) {
      case 0:
        newPositions.first_block = { top: 15, left: 0 };
        newPositions.second_block = { top: -15, left: 0 };
        newPositions.third_block = { top: -15, left: 30 };
        newPositions.main_block = { top: 15, left: -30 };
        break;
      case 90:
        newPositions.first_block = { top: 0, left: 15 };
        newPositions.second_block = { top: 0, left: -15 };
        newPositions.third_block = { top: -30, left: -15 };
        newPositions.main_block = { top: 30, left: 15 };
        break;
      case 180:
        newPositions.first_block = { top: -15, left: 0 };
        newPositions.second_block = { top: 15, left: 0 };
        newPositions.third_block = { top: 15, left: -30 };
        newPositions.main_block = { top: -15, left: 30 };
        break;
      case 270:
        newPositions.first_block = { top: 0, left: -15 };
        newPositions.second_block = { top: 0, left: 15 };
        newPositions.third_block = { top: 30, left: 15 };
        newPositions.main_block = { top: -30, left: -15 };
        break;
      default:
        break;
    }
  
    return newPositions;
  }
  
  function calculateReverseSquigglyBlockRotation(orientation : number) : BlockPositions {
    let newPositions : BlockPositions = {
      first_block : {
        top : 0,
        left : 0,
      },
      second_block : {
        top : 0,
        left : 0,
      },
      third_block : {
        top : 0,
        left : 0,
      },
      main_block : {
        top : 0,
        left : 0,
      }
    };
  
    switch (orientation) {
      case 0:
        newPositions.first_block = { top: 15, left: 0 };
        newPositions.second_block = { top: -15, left: 0 };
        newPositions.third_block = { top: -15, left: -30 };
        newPositions.main_block = { top: 15, left: 30 };
        break;
      case 90:
        newPositions.first_block = { top: 0, left: 15 };
        newPositions.second_block = { top: 0, left: -15 };
        newPositions.third_block = { top: 30, left: -15 };
        newPositions.main_block = { top: -30, left: 15 };
        break;
      case 180:
        newPositions.first_block = { top: -15, left: 0 };
        newPositions.second_block = { top: 15, left: 0 };
        newPositions.third_block = { top: 15, left: 30 };
        newPositions.main_block = { top: -15, left: -30 };
        break;
      case 270:
        newPositions.first_block = { top: 0, left: -15 };
        newPositions.second_block = { top: 0, left: 15 };
        newPositions.third_block = { top: -30, left: 15 };
        newPositions.main_block = { top: 30, left: -15 };
        break;
      default:
        break;
    }
  
    return newPositions;
  }
  
  function calculateSquareBlockRotation(orientation : number) : BlockPositions {
    let newPositions : BlockPositions = {
      first_block : {
        top : 0,
        left : 0,
      },
      second_block : {
        top : 0,
        left : 0,
      },
      third_block : {
        top : 0,
        left : 0,
      },
      main_block : {
        top : 0,
        left : 0,
      }
    };
  
    switch (orientation) {
      case 0:
        newPositions.first_block = { top: -15, left: -15 };
        newPositions.second_block = { top: 15, left: -15 };
        newPositions.third_block = { top: 15, left: 15 };
        newPositions.main_block = { top: -15, left: 15 };
        break;
      case 90:
        newPositions.first_block = { top: 15, left: -15 };
        newPositions.second_block = { top: 15, left: 15 };
        newPositions.third_block = { top: -15, left: 15 };
        newPositions.main_block = { top: -15, left: -15 };
        break;
      case 180:
        newPositions.first_block = { top: 15, left: 15 };
        newPositions.second_block = { top: -15, left: 15 };
        newPositions.third_block = { top: -15, left: -15 };
        newPositions.main_block = { top: 15, left: -15 };
        break;
      case 270:
        newPositions.first_block = { top: -15, left: 15 };
        newPositions.second_block = { top: -15, left: -15 };
        newPositions.third_block = { top: 15, left: -15 };
        newPositions.main_block = { top: 15, left: 15 };
        break;
      default:
        break;
    }
  
    return newPositions;
  }
  
  function calculateLineBlockRotation(orientation : number) : BlockPositions {
    let newPositions : BlockPositions = {
      first_block : {
        top : 0,
        left : 0,
      },
      second_block : {
        top : 0,
        left : 0,
      },
      third_block : {
        top : 0,
        left : 0,
      },
      main_block : {
        top : 0,
        left : 0,
      }
    };
  
    switch (orientation) {
      case 0:
        newPositions.first_block = { top: 0, left: -15 };
        newPositions.second_block = { top: 0, left: 15 };
        newPositions.third_block = { top: 0, left: 45 };
        newPositions.main_block = { top: 0, left: -45 };
        break;
      case 90:
        newPositions.first_block = { top: -15, left: 0 };
        newPositions.second_block = { top: 15, left: 0 };
        newPositions.third_block = { top: 45, left: 0 };
        newPositions.main_block = { top: -45, left: 0 };
        break;
      case 180:
        newPositions.first_block = { top: 0, left: 15 };
        newPositions.second_block = { top: 0, left: -15 };
        newPositions.third_block = { top: 0, left: -45 };
        newPositions.main_block = { top: 0, left: 45 };
        break;
      case 270:
        newPositions.first_block = { top: 15, left: 0 };
        newPositions.second_block = { top: -15, left: 0 };
        newPositions.third_block = { top: -45, left: 0 };
        newPositions.main_block = { top: 45, left: 0 };
        break;
      default:
        break;
    }
  
    return newPositions;
  }
  
  const tBlockStartPositions : StartPositions = {
    first_block: { top: 0, left: 30 },
    second_block: { top: 0, left: -30 },
    third_block: { top: 30, left: 0 },
    main_block: { top: 0, left: 0 },
    default_position: [135, 30]
  };
  
  const lBlockStartPositions : StartPositions = {
    first_block: { top: 30, left: -15 },
    second_block: { top: 0, left: -15 },
    third_block: { top: -30, left: -15 },
    main_block: { top: 30, left: 15 },
    default_position: [135, 30]
  };
  
  const reverseLBlockStartPositions : StartPositions = {
    first_block: { top: 30, left: 15 },
    second_block: { top: 0, left: 15 },
    third_block: { top: -30, left: 15 },
    main_block: { top: 30, left: -15 },
    default_position: [135, 30]
  };
  
  const squigglyBlockStartPositions : StartPositions = {
    first_block: { top: 15, left: 0 },
    second_block: { top: -15, left: 0 },
    third_block: { top: -15, left: 30 },
    main_block: { top: 15, left: -30 },
    default_position: [135, 30]
  };
  
  const reverseSquigglyBlockStartPositions : StartPositions = {
    first_block: { top: 15, left: 0 },
    second_block: { top: -15, left: 0 },
    third_block: { top: -15, left: -30 },
    main_block: { top: 15, left: 30 },
    default_position: [135, 30]
  };
  
  const squareBlockStartPositions : StartPositions = {
    first_block: { top: -15, left: -15 },
    second_block: { top: 15, left: -15 },
    third_block: { top: 15, left: 15 },
    main_block: { top: -15, left: 15 },
    default_position: [135, 30]
  };
  
  const lineBlockStartPositions : StartPositions = {
    first_block : { top: 0, left: -15 },
    second_block : { top: 0, left: 15 },
    third_block : { top: 0, left: 45 },
    main_block : { top: 0, left: -45 },
    default_position: [135, 30]
  };

  function createBlockConfig(type : string) : BlockConfiguration | null {
    let config : BlockConfiguration;

    switch(type) {
      case 't':
        config = {
          position: tBlockStartPositions.default_position,
          group_positions: tBlockStartPositions,
          orientation: 0,
          rotate_function: calculateTBlockRotation
        };
        break;
      case 'squiggly':
        config = {
          position: squigglyBlockStartPositions.default_position,
          group_positions: squigglyBlockStartPositions,
          orientation: 0,
          rotate_function: calculateSquigglyBlockRotation
        };
        break;
      case 'reverseSquiggly':
        config = {
          position: reverseSquigglyBlockStartPositions.default_position,
          group_positions: reverseSquigglyBlockStartPositions,
          orientation: 0,
          rotate_function: calculateReverseSquigglyBlockRotation
        };
        break;
      case 'l':
        config = {
          position: lBlockStartPositions.default_position,
          group_positions: lBlockStartPositions,
          orientation: 0,
          rotate_function: calculateLBlockRotation
        };
        break;
      case 'reverseL':
        config = {
          position: reverseLBlockStartPositions.default_position,
          group_positions: reverseLBlockStartPositions,
          orientation: 0,
          rotate_function: calculateReverseLBlockRotation
        };
        break;
      case 'square':
        config = {
          position: squareBlockStartPositions.default_position,
          group_positions: squareBlockStartPositions,
          orientation: 0,
          rotate_function: calculateSquareBlockRotation
        };
        break;
      case 'line':
        config = {
          position: lineBlockStartPositions.default_position,
          group_positions: lineBlockStartPositions,
          orientation: 0,
          rotate_function: calculateLineBlockRotation
        };
        break;
      default:
        return null;
    }

    return config;
  }

export { createBlockConfig, BlockConfiguration, PositionLimit };