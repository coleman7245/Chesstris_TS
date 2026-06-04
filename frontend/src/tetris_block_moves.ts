type Position = {
  top : number,
  left : number
}

let default_position : Position = {top: 30, left : 135};

type BlockConfiguration = {
  position: Position,
  group_positions: Array<Position>,
  orientation: number,
  rotate_function: Function
}

function calculateTBlockRotation(orientation : number) : Array<Position> {
    let newPositions : Array<Position> = [
      {
        top : 0,
        left : 0,
      },
      {
        top : 0,
        left : 0,
      },
      {
        top : 0,
        left : 0,
      },
      {
        top : 0,
        left : 0,
      }
    ];
  
    switch (orientation) {
      case 0:
        newPositions[0] = { top: 0, left: 0 };
        newPositions[1] = { top: 0, left: 30 };
        newPositions[2] = { top: 0, left: -30 };
        newPositions[3] = { top: 30, left: 0 };
        break;
      case 90:
        newPositions[0] = { top: 0, left: 0 };
        newPositions[1] = { top: -30, left: 0 };
        newPositions[2] = { top: 30, left: 0 };
        newPositions[3] = { top: 0, left: 30 };
        break;
      case 180:
        newPositions[0] = { top: 0, left: 0 };
        newPositions[1] = { top: 0, left: -30 };
        newPositions[2] = { top: 0, left: 30 };
        newPositions[3] = { top: -30, left: 0 };
        break;
      case 270:
        newPositions[0] = { top: 0, left: 0 };
        newPositions[1] = { top: 30, left: 0 };
        newPositions[2] = { top: -30, left: 0 };
        newPositions[3] = { top: 0, left: -30 };
        break;
      default:
        break;
    }
  
    return newPositions;
  }
  
  function calculateLBlockRotation(orientation : number) : Array<Position> {
    let newPositions : Array<Position> = [
      {
        top : 0,
        left : 0,
      },
      {
        top : 0,
        left : 0,
      },
      {
        top : 0,
        left : 0,
      },
      {
        top : 0,
        left : 0,
      }
    ];
  
    switch (orientation) {
      case 0:
        newPositions[0] = { top: 30, left: 15 };
        newPositions[1] = { top: 30, left: -15 };
        newPositions[2] = { top: 0, left: -15 };
        newPositions[3] = { top: -30, left: -15 };
        break;
      case 90:
        newPositions[0] = { top: -15, left: 30 };
        newPositions[1] = { top: 15, left: 30 };
        newPositions[2] = { top: 15, left: 0 };
        newPositions[3] = { top: 15, left: -30 };
        break;
      case 180:
        newPositions[0] = { top: -30, left: -15 };
        newPositions[1] = { top: -30, left: 15 };
        newPositions[2] = { top: 0, left: 15 };
        newPositions[3] = { top: 30, left: 15 };
        break;
      case 270:
        newPositions[0] = { top: 15, left: -30 };
        newPositions[1] = { top: -15, left: -30 };
        newPositions[2] = { top: -15, left: 0 };
        newPositions[3] = { top: -15, left: 30 };
        break;
      default:
        break;
    }
  
    return newPositions;
  }
  
  function calculateReverseLBlockRotation(orientation : number) : Array<Position> {
    let newPositions : Array<Position> = [
      {
        top : 0,
        left : 0,
      },
      {
        top : 0,
        left : 0,
      },
      {
        top : 0,
        left : 0,
      },
      {
        top : 0,
        left : 0,
      }
    ];
  
    switch (orientation) {
      case 0:
        newPositions[0] = { top: 30, left: -15 };
        newPositions[1] = { top: 30, left: 15 };
        newPositions[2] = { top: 0, left: 15 };
        newPositions[3] = { top: -30, left: 15 };
        break;
      case 90:
        newPositions[0] = { top: 15, left: 30 };
        newPositions[1] = { top: -15, left: 30 };
        newPositions[2] = { top: -15, left: 0 };
        newPositions[3] = { top: -15, left: -30 };
        break;
      case 180:
        newPositions[0] = { top: -30, left: 15 };
        newPositions[1] = { top: -30, left: -15 };
        newPositions[2] = { top: 0, left: -15 };
        newPositions[3] = { top: 30, left: -15 };
        break;
      case 270:
        newPositions[0] = { top: -15, left: -30 };
        newPositions[1] = { top: 15, left: -30 };
        newPositions[2] = { top: 15, left: 0 };
        newPositions[3] = { top: 15, left: 30 };
        break;
      default:
        break;
    }
  
    return newPositions;
  }
  
  function calculateSquigglyBlockRotation(orientation : number) : Array<Position> {
    let newPositions : Array<Position> = [
      {
        top : 0,
        left : 0,
      },
      {
        top : 0,
        left : 0,
      },
      {
        top : 0,
        left : 0,
      },
      {
        top : 0,
        left : 0,
      }
    ];
  
    switch (orientation) {
      case 0:
        newPositions[0] = { top: 15, left: -30 };
        newPositions[1] = { top: 15, left: 0 };
        newPositions[2] = { top: -15, left: 0 };
        newPositions[3] = { top: -15, left: 30 };
        break;
      case 90:
        newPositions[0] = { top: 30, left: 15 };
        newPositions[1] = { top: 0, left: 15 };
        newPositions[2] = { top: 0, left: -15 };
        newPositions[3] = { top: -30, left: -15 };
        break;
      case 180:
        newPositions[0] = { top: -15, left: 30 };
        newPositions[1] = { top: -15, left: 0 };
        newPositions[2] = { top: 15, left: 0 };
        newPositions[3] = { top: 15, left: -30 };
        break;
      case 270:
        newPositions[0] = { top: -30, left: -15 };
        newPositions[1] = { top: 0, left: -15 };
        newPositions[2] = { top: 0, left: 15 };
        newPositions[3] = { top: 30, left: 15 };
        break;
      default:
        break;
    }
  
    return newPositions;
  }
  
  function calculateReverseSquigglyBlockRotation(orientation : number) : Array<Position> {
    let newPositions : Array<Position> = [
      {
        top : 0,
        left : 0,
      },
      {
        top : 0,
        left : 0,
      },
      {
        top : 0,
        left : 0,
      },
      {
        top : 0,
        left : 0,
      }
    ];
  
    switch (orientation) {
      case 0:
        newPositions[0] = { top: 15, left: 30 };
        newPositions[1] = { top: 15, left: 0 };
        newPositions[2] = { top: -15, left: 0 };
        newPositions[3] = { top: -15, left: -30 };
        break;
      case 90:
        newPositions[0] = { top: -30, left: 15 };
        newPositions[1] = { top: 0, left: 15 };
        newPositions[2] = { top: 0, left: -15 };
        newPositions[3] = { top: 30, left: -15 };
        break;
      case 180:
        newPositions[0] = { top: -15, left: -30 };
        newPositions[1] = { top: -15, left: 0 };
        newPositions[2] = { top: 15, left: 0 };
        newPositions[3] = { top: 15, left: 30 };
        break;
      case 270:
        newPositions[0] = { top: 30, left: -15 };
        newPositions[1] = { top: 0, left: -15 };
        newPositions[2] = { top: 0, left: 15 };
        newPositions[3] = { top: -30, left: 15 };
        break;
      default:
        break;
    }
  
    return newPositions;
  }
  
  function calculateSquareBlockRotation(orientation : number) : Array<Position> {
    let newPositions : Array<Position> = [
      {
        top : 0,
        left : 0,
      },
      {
        top : 0,
        left : 0,
      },
      {
        top : 0,
        left : 0,
      },
      {
        top : 0,
        left : 0,
      }
    ];
  
    switch (orientation) {
      case 0:
        newPositions[0] = { top: -15, left: 15 };
        newPositions[1] = { top: -15, left: -15 };
        newPositions[2] = { top: 15, left: -15 };
        newPositions[3] = { top: 15, left: 15 };
        break;
      case 90:
        newPositions[0] = { top: -15, left: -15 };
        newPositions[1] = { top: 15, left: -15 };
        newPositions[2] = { top: 15, left: 15 };
        newPositions[3] = { top: -15, left: 15 };
        break;
      case 180:
        newPositions[0] = { top: 15, left: -15 };
        newPositions[1] = { top: 15, left: 15 };
        newPositions[2] = { top: -15, left: 15 };
        newPositions[3] = { top: -15, left: -15 };
        break;
      case 270:
        newPositions[0] = { top: 15, left: 15 };
        newPositions[1] = { top: -15, left: 15 };
        newPositions[2] = { top: -15, left: -15 };
        newPositions[3] = { top: 15, left: -15 };
        break;
      default:
        break;
    }
  
    return newPositions;
  }
  
  function calculateLineBlockRotation(orientation : number) : Array<Position> {
    let newPositions : Array<Position> = [
      {
        top : 0,
        left : 0,
      },
      {
        top : 0,
        left : 0,
      },
      {
        top : 0,
        left : 0,
      },
      {
        top : 0,
        left : 0,
      }
    ];
  
    switch (orientation) {
      case 0:
        newPositions[0] = { top: 0, left: -45 };
        newPositions[1] = { top: 0, left: -15 };
        newPositions[2] = { top: 0, left: 15 };
        newPositions[3] = { top: 0, left: 45 };
        break;
      case 90:
        newPositions[0] = { top: -45, left: 0 };
        newPositions[1] = { top: -15, left: 0 };
        newPositions[2] = { top: 15, left: 0 };
        newPositions[3] = { top: 45, left: 0 };
        break;
      case 180:
        newPositions[0] = { top: 0, left: 45 };
        newPositions[1] = { top: 0, left: 15 };
        newPositions[2] = { top: 0, left: -15 };
        newPositions[3] = { top: 0, left: -45 };
        break;
      case 270:
        newPositions[0] = { top: 45, left: 0 };
        newPositions[1] = { top: 15, left: 0 };
        newPositions[2] = { top: -15, left: 0 };
        newPositions[3] = { top: -45, left: 0 };
        break;
      default:
        break;
    }
  
    return newPositions;
  }
  
  function createBlockConfig(type : string) : BlockConfiguration | null {
    let config : BlockConfiguration;

    switch(type) {
      case 't':
        config = {
          position: default_position,
          group_positions: calculateTBlockRotation(0),
          orientation: 0,
          rotate_function: calculateTBlockRotation
        };
        break;
      case 'squiggly':
        config = {
          position: default_position,
          group_positions: calculateSquigglyBlockRotation(0),
          orientation: 0,
          rotate_function: calculateSquigglyBlockRotation
        };
        break;
      case 'reverseSquiggly':
        config = {
          position: default_position,
          group_positions: calculateReverseSquigglyBlockRotation(0),
          orientation: 0,
          rotate_function: calculateReverseSquigglyBlockRotation
        };
        break;
      case 'l':
        config = {
          position: default_position,
          group_positions: calculateLBlockRotation(0),
          orientation: 0,
          rotate_function: calculateLBlockRotation
        };
        break;
      case 'reverseL':
        config = {
          position: default_position,
          group_positions: calculateReverseLBlockRotation(0),
          orientation: 0,
          rotate_function: calculateReverseLBlockRotation
        };
        break;
      case 'square':
        config = {
          position: default_position,
          group_positions: calculateSquareBlockRotation(0),
          orientation: 0,
          rotate_function: calculateSquareBlockRotation
        };
        break;
      case 'line':
        config = {
          position: default_position,
          group_positions: calculateLineBlockRotation(0),
          orientation: 0,
          rotate_function: calculateLineBlockRotation
        };
        break;
      default:
        return null;
    }

    return config;
  }

export { createBlockConfig, BlockConfiguration };