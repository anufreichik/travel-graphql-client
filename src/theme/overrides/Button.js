// ----------------------------------------------------------------------

export default function Button(theme) {
  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          // borderRadius: 0,
          // '&:hover': {
          //   boxShadow: 'none'
          // }
          fontSize: '0.875rem',
          fontWeight: 600,
          borderRadius: 0,
          textTransform: 'none',
          '&.MuiButton-contained': {
            color:theme.palette.grey[0],
            boxShadow: theme.customShadows.z8,
            '&:hover': {
              backgroundColor: theme.palette.grey[400]
            },
          },
          '&.MuiButton-containedPrimary': {
            '&:hover': {
              backgroundColor: theme.palette.primary.light
            },
          },
          '&.MuiButton-containedSecondary': {
            color: theme.palette.grey[800],
            backgroundColor: theme.palette.grey[400],
            '&:hover': {
              backgroundColor: theme.palette.grey[300]
            },
          },
          '&.MuiButton-outlined': {
            color: theme.palette.grey[800],
            border: `1px solid ${theme.palette.grey[500_32]}`,
            '&:hover': {
              backgroundColor: theme.palette.action.hover
            },
          },
          '&.Mui-disabled': {
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
          },
        },
        sizeLarge: {
          height: 48
        },
        // containedInherit: {
        //   color: theme.palette.grey[800],
        //   boxShadow: theme.customShadows.z8,
        //   '&:hover': {
        //     backgroundColor: theme.palette.grey[400]
        //   }
        // },
        // containedPrimary: {
        //   boxShadow: theme.customShadows.primary
        // },
        // containedSecondary: {
        //   boxShadow: theme.customShadows.secondary
        // },
        // outlinedInherit: {
        //   border: `1px solid ${theme.palette.grey[500_32]}`,
        //   '&:hover': {
        //     backgroundColor: theme.palette.action.hover
        //   }
        // },
        // textInherit: {
        //   '&:hover': {
        //     backgroundColor: theme.palette.action.hover
        //   }
        // }
      }
    }
  };
}
